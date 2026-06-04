import {
	useLayoutEffect,
	useRef,
	useState,
	type CSSProperties,
	type ReactNode,
} from "react";

import styles from "./SortableList.module.css";
import { cx } from "./cx";

export interface SortableListProps<T = unknown> {
	items: T[];
	renderItem: (item: T, index: number) => ReactNode;
	onReorder: (items: T[]) => void;
	getKey?: (item: T, index: number) => string | number;
	className?: string;
	style?: CSSProperties;
	"aria-label"?: string;
}

interface CardSnapshot {
	key: string;
	element: HTMLElement;
	top: number;
	height: number;
}

interface DragState<T> {
	startIndex: number;
	targetIndex: number;
	startY: number;
	gap: number;
	items: T[];
	cards: CardSnapshot[];
}

const ANIMATION_MS = 160;

export function SortableList<T = unknown>({
	items,
	renderItem,
	onReorder,
	getKey,
	className,
	style,
	"aria-label": ariaLabel,
}: SortableListProps<T>) {
	const containerRef = useRef<HTMLDivElement>(null);
	const dragRef = useRef<DragState<T> | null>(null);
	const pendingRectsRef = useRef<Map<string, DOMRect> | null>(null);
	const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

	function keyFor(item: T, index: number) {
		return String(getKey ? getKey(item, index) : index);
	}

	function getCards() {
		const container = containerRef.current;
		if (container === null) return [];

		return Array.from(
			container.querySelectorAll<HTMLElement>("[data-sortable-key]"),
		).map((element) => {
			const rect = element.getBoundingClientRect();
			return {
				key: element.dataset.sortableKey ?? "",
				element,
				top: rect.top,
				height: rect.height,
			};
		});
	}

	function clearCardStyles(cards = getCards()) {
		for (const card of cards) {
			card.element.style.transform = "";
			card.element.style.zIndex = "";
		}
	}

	function snapshotVisualRects() {
		const rects = new Map<string, DOMRect>();
		for (const card of getCards()) {
			rects.set(card.key, card.element.getBoundingClientRect());
		}
		return rects;
	}

	useLayoutEffect(() => {
		const firstRects = pendingRectsRef.current;
		if (firstRects === null) return;
		pendingRectsRef.current = null;

		const cards = getCards();
		clearCardStyles(cards);

		for (const card of cards) {
			const first = firstRects.get(card.key);
			if (first === undefined) continue;

			const last = card.element.getBoundingClientRect();
			const dy = first.top - last.top;
			if (Math.abs(dy) < 0.5) continue;

			card.element.animate(
				[{ transform: `translateY(${dy}px)` }, { transform: "translateY(0)" }],
				{
					duration: ANIMATION_MS,
					easing: "cubic-bezier(0.2, 0, 0, 1)",
				},
			);
		}
	}, [items]);

	function updatePreview(state: DragState<T>, dy: number) {
		const dragged = state.cards[state.startIndex];
		if (dragged === undefined) return;

		dragged.element.style.transform = `translateY(${dy}px)`;
		dragged.element.style.zIndex = "1";

		const draggedCenter = dragged.top + dy + dragged.height / 2;
		const nextTarget = state.cards.reduce((count, card, index) => {
			if (index === state.startIndex) return count;
			return card.top + card.height / 2 < draggedCenter ? count + 1 : count;
		}, 0);

		state.targetIndex = Math.max(
			0,
			Math.min(state.cards.length - 1, nextTarget),
		);

		for (let index = 0; index < state.cards.length; index++) {
			if (index === state.startIndex) continue;

			const card = state.cards[index]!;
			let offset = 0;
			if (state.startIndex < state.targetIndex) {
				if (index > state.startIndex && index <= state.targetIndex) {
					offset = -(dragged.height + state.gap);
				}
			} else if (state.startIndex > state.targetIndex) {
				if (index >= state.targetIndex && index < state.startIndex) {
					offset = dragged.height + state.gap;
				}
			}

			card.element.style.transform =
				offset === 0 ? "" : `translateY(${offset}px)`;
		}
	}

	function handlePointerDown(
		event: React.PointerEvent<HTMLDivElement>,
		index: number,
	) {
		if (event.button !== 0) return;
		if (shouldCancelDrag(event.target, event.currentTarget)) return;

		const cards = getCards();
		if (cards.length === 0) return;

		const computedStyle =
			containerRef.current!.ownerDocument.defaultView?.getComputedStyle(
				containerRef.current!,
			);
		const gap =
			computedStyle === undefined
				? 0
				: Number.parseFloat(computedStyle.rowGap || computedStyle.gap) || 0;
		const state: DragState<T> = {
			startIndex: index,
			targetIndex: index,
			startY: event.clientY,
			gap,
			items,
			cards,
		};

		dragRef.current = state;
		setDraggingIndex(index);
		event.preventDefault();

		function onPointerMove(moveEvent: PointerEvent) {
			const current = dragRef.current;
			if (current === null) return;
			updatePreview(current, moveEvent.clientY - current.startY);
		}

		function onPointerUp() {
			const current = dragRef.current;
			dragRef.current = null;
			document.removeEventListener("pointermove", onPointerMove);
			document.removeEventListener("pointerup", onPointerUp);

			if (current === null) return;

			if (current.targetIndex !== current.startIndex) {
				pendingRectsRef.current = snapshotVisualRects();
				clearCardStyles(current.cards);
				onReorder(
					moveItem(current.items, current.startIndex, current.targetIndex),
				);
			} else {
				clearCardStyles(current.cards);
			}

			setDraggingIndex(null);
		}

		document.addEventListener("pointermove", onPointerMove);
		document.addEventListener("pointerup", onPointerUp, { once: true });
	}

	return (
		<div
			ref={containerRef}
			role="list"
			aria-label={ariaLabel}
			className={cx(styles.list, className)}
			style={style}
		>
			{items.map((item, index) => {
				const key = keyFor(item, index);
				return (
					<div
						key={key}
						role="listitem"
						data-sortable-key={key}
						className={cx(
							styles.card,
							draggingIndex === index && styles.dragging,
						)}
						onPointerDown={(event) => handlePointerDown(event, index)}
					>
						{renderItem(item, index)}
					</div>
				);
			})}
		</div>
	);
}

function moveItem<T>(items: T[], from: number, to: number) {
	const next = [...items];
	const [moved] = next.splice(from, 1);
	if (moved !== undefined) next.splice(to, 0, moved);
	return next;
}

function shouldCancelDrag(target: EventTarget, root: HTMLElement) {
	const ElementCtor = root.ownerDocument.defaultView?.Element;
	if (ElementCtor === undefined || !(target instanceof ElementCtor))
		return false;
	const interactive = target.closest(
		'a, button, input, textarea, select, option, [contenteditable="true"]',
	);
	return interactive !== null && interactive !== root;
}
