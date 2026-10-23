"use client"
import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useDragControls } from 'framer-motion'
import { X } from 'lucide-react';
import { EASE } from '@/components/motion/motion-primitives';


// MediaItemType defines the structure of a media item
export interface MediaItemType {
    id: number;
    type: string;
    title: string;
    desc: string;
    url: string;
    /** landscape = wide centre tile (2 cols x 2 rows), portrait = side tile (1 col x 3 rows) */
    orientation: "landscape" | "portrait";
    /** Optional still frame shown while a video loads */
    poster?: string;
}

const COLS = 4;
const ORIENTATION_SPAN = {
    landscape: { w: 2, h: 2 },
    portrait: { w: 1, h: 3 },
} as const;

// MediaItem component renders either a video or image based on item.type
const MediaItem = ({ item, className, onClick }: { item: MediaItemType, className?: string, onClick?: () => void }) => {
    const videoRef = useRef<HTMLVideoElement>(null); // Reference for video element
    const [isInView, setIsInView] = useState(false); // To track if video is in the viewport
    const [isBuffering, setIsBuffering] = useState(false);  // True from a play request until frames arrive

    // Intersection Observer to detect if video is in view and play/pause accordingly
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                setIsInView(entry.isIntersecting); // Set isInView to true if the video is in view
            });
        }, options);

        const node = videoRef.current;
        if (node) {
            observer.observe(node); // Start observing the video element
        }

        return () => {
            if (node) {
                observer.unobserve(node); // Clean up observer when component unmounts
            }
        };
    }, []);
    // Handle video play/pause based on whether the video is in view or not
    useEffect(() => {
        let mounted = true;
        const video = videoRef.current;

        const handleVideoPlay = async () => {
            if (!video || !isInView || !mounted) return; // Don't play if video is not in view or component is unmounted

            try {
                // preload="none": play() is what starts the download, so call it straight away
                if (video.readyState < 3) setIsBuffering(true);
                await video.play();
                if (mounted) setIsBuffering(false);
            } catch (error) {
                console.warn("Video playback failed:", error);
            }
        };

        if (isInView) {
            handleVideoPlay();
        } else if (video) {
            video.pause();
        }

        return () => {
            mounted = false;
            video?.pause();
        };
    }, [isInView]);

    // Render either a video or image based on item.type

    if (item.type === 'video') {
        return (
            <div className={`${className} relative overflow-hidden`}>
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    onClick={onClick}
                    playsInline
                    muted
                    loop
                    // Nothing downloads until the tile scrolls into view (the poster shows meanwhile)
                    preload="none"
                    poster={item.poster ? encodeURI(item.poster) : undefined}
                    onPlaying={() => setIsBuffering(false)}
                    style={{
                        opacity: isBuffering ? 0.8 : 1,
                        transition: 'opacity 0.2s',
                        transform: 'translateZ(0)',
                        willChange: 'transform',
                    }}
                >
                    <source src={encodeURI(item.url)} type="video/mp4" />
                </video>
                {isBuffering && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                )}
            </div>
        );
    }

    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={encodeURI(item.url)} // Image source URL
            alt={item.title} // Alt text for the image
            className={`${className} object-cover cursor-pointer`} // Style the image
            onClick={onClick} // Trigger onClick when the image is clicked
            draggable={false} // Native image drag would hijack the pointer and block tile dragging
            loading="lazy" // Lazy load the image for performance
            decoding="async" // Decode the image asynchronously
        />
    );
};



// GalleryModal component displays the selected media item in a modal
interface GalleryModalProps {
    selectedItem: MediaItemType;
    isOpen: boolean;
    onClose: () => void;
    setSelectedItem: (item: MediaItemType | null) => void;
    mediaItems: MediaItemType[]; // List of media items to display in the modal
}
const GalleryModal = ({ selectedItem, isOpen, onClose, setSelectedItem, mediaItems }: GalleryModalProps) => {
    const [dockPosition, setDockPosition] = useState({ x: 0, y: 0 });  // Track the position of the dockable panel

    if (!isOpen) return null; // Return null if the modal is not open

    const isPortrait = selectedItem.orientation === "portrait";

    return (
        <>
            {/* Main Modal */}
            <motion.div
                initial={{ scale: 0.98 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.98 }}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30
                }}
                // Full-viewport overlay so the media is centred on screen (was capped at 600px tall on desktop)
                className="fixed inset-0 w-full h-[100dvh] backdrop-blur-lg overflow-hidden z-[60]"

            >
                {/* Main Content */}
                <div className="h-full flex flex-col">
                    <div className="flex-1 p-2 sm:p-3 md:p-4 flex items-center justify-center bg-gray-50/50" onClick={onClose}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedItem.id}
                                // Frame follows the media's shape: 16:9 for landscape, 3:4 for portrait
                                className={`relative rounded-lg overflow-hidden shadow-md ${
                                    isPortrait
                                        ? "aspect-[3/4] h-[70vh] max-w-[95%]"
                                        : "w-full aspect-[16/9] max-w-[95%] sm:max-w-[85%] md:max-w-3xl h-auto max-h-[70vh]"
                                }`}
                                initial={{ y: 20, scale: 0.97 }}
                                animate={{
                                    y: 0,
                                    scale: 1,
                                    transition: {
                                        type: "spring",
                                        stiffness: 500,
                                        damping: 30,
                                        mass: 0.5
                                    }
                                }}
                                exit={{
                                    y: 20,
                                    scale: 0.97,
                                    transition: { duration: 0.15 }
                                }}
                                onClick={onClose}
                            >
                                <MediaItem item={selectedItem} className="w-full h-full object-contain bg-gray-900/20" onClick={onClose} />
                                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4
                                              bg-gradient-to-t from-black/50 to-transparent">
                                    <h3 className="text-white text-base sm:text-lg md:text-xl font-semibold">
                                        {selectedItem.title}
                                    </h3>
                                    <p className="text-white/80 text-xs sm:text-sm mt-1">
                                        {selectedItem.desc}
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Close Button */}
                <motion.button
                    className="absolute top-2 sm:top-2.5 md:top-3 right-2 sm:right-2.5 md:right-3
                              p-2 rounded-full bg-gray-200/80 text-gray-700 hover:bg-gray-300/80
                              text-xs sm:text-sm backdrop-blur-sm "
                    onClick={onClose}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Close"
                >
                    <X className='w-3 h-3' />
                </motion.button>

            </motion.div>

            {/* Draggable Dock — centred by a flex wrapper, since motion's drag transform overrides translate-x classes */}
            <div className="fixed inset-x-0 bottom-4 z-[70] flex justify-center pointer-events-none">
            <motion.div
                drag
                dragMomentum={false}
                dragElastic={0.1}
                initial={false}
                animate={{ x: dockPosition.x, y: dockPosition.y }}
                onDragEnd={(_, info) => {
                    setDockPosition(prev => ({
                        x: prev.x + info.offset.x,
                        y: prev.y + info.offset.y
                    }));
                }}
                className="pointer-events-auto touch-none"
            >
                <motion.div
                    className="relative rounded-xl bg-sky-400/20 backdrop-blur-xl
                             border border-blue-400/30 shadow-lg
                             cursor-grab active:cursor-grabbing"
                >
                    <div className="flex items-center -space-x-2 px-3 py-2">
                        {mediaItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedItem(item);
                                }}
                                style={{
                                    zIndex: selectedItem.id === item.id ? 30 : mediaItems.length - index,
                                }}
                                className={`
                                    relative group
                                    w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex-shrink-0
                                    rounded-lg overflow-hidden
                                    cursor-pointer hover:z-20
                                    ${selectedItem.id === item.id
                                        ? 'ring-2 ring-white/70 shadow-lg'
                                        : 'hover:ring-2 hover:ring-white/30'}
                                `}
                                initial={{ rotate: index % 2 === 0 ? -15 : 15 }}
                                animate={{
                                    scale: selectedItem.id === item.id ? 1.2 : 1,
                                    rotate: selectedItem.id === item.id ? 0 : index % 2 === 0 ? -15 : 15,
                                    y: selectedItem.id === item.id ? -8 : 0,
                                }}
                                whileHover={{
                                    scale: 1.3,
                                    rotate: 0,
                                    y: -10,
                                    transition: { type: "spring", stiffness: 400, damping: 25 }
                                }}
                            >
                                <MediaItem item={item} className="w-full h-full" onClick={() => setSelectedItem(item)} />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/20" />
                                {selectedItem.id === item.id && (
                                    <motion.div
                                        layoutId="activeGlow"
                                        className="absolute -inset-2 bg-white/20 blur-xl"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.2 }}
                                    />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
            </div>
        </>
    );
};



interface InteractiveBentoGalleryProps {
    mediaItems: MediaItemType[]
    title: string
    description: string

}

// ---- Grid layout: every tile has an explicit top-left cell, so tiles can be dropped into open slots ----

interface Cell { col: number; row: number }
type Layout = Record<number, Cell>; // item id -> top-left cell (0-based)

const spanOf = (item: MediaItemType) => ORIENTATION_SPAN[item.orientation];

const overlaps = (a: Cell, as: { w: number; h: number }, b: Cell, bs: { w: number; h: number }) =>
    a.col < b.col + bs.w && b.col < a.col + as.w && a.row < b.row + bs.h && b.row < a.row + as.h;

// Can `item` sit at `cell` without leaving the grid or covering another placed tile?
const fits = (items: MediaItemType[], layout: Layout, item: MediaItemType, cell: Cell) => {
    const s = spanOf(item);
    if (cell.col < 0 || cell.row < 0 || cell.col + s.w > COLS) return false;
    return items.every((o) => o.id === item.id || !layout[o.id] || !overlaps(cell, s, layout[o.id], spanOf(o)));
};

// Bottom edge (in rows) of the placed tiles, optionally ignoring one
const bottomOf = (items: MediaItemType[], layout: Layout, exclude?: number) =>
    items.reduce((max, o) => (o.id !== exclude && layout[o.id] ? Math.max(max, layout[o.id].row + spanOf(o).h) : max), 0);

// Same result as CSS grid's default (sparse) auto-placement, so the starting layout matches the original staggered look
const autoPlace = (items: MediaItemType[]) => {
    const layout: Layout = {};
    let cursor: Cell = { col: 0, row: 0 };
    for (const item of items) {
        let { col, row } = cursor;
        while (!fits(items, layout, item, { col, row })) {
            col++;
            if (col + spanOf(item).w > COLS) {
                col = 0;
                row++;
            }
        }
        layout[item.id] = { col, row };
        cursor = { col, row };
    }
    return layout;
};

// Open cell closest to `near` (there is always room on the row below everything)
const nearestFree = (items: MediaItemType[], layout: Layout, item: MediaItemType, near: Cell) => {
    let best: Cell = { col: 0, row: bottomOf(items, layout) };
    let bestDist = Infinity;
    for (let row = 0; row <= best.row; row++) {
        for (let col = 0; col < COLS; col++) {
            const dist = Math.hypot(col - near.col, row - near.row);
            if (dist < bestDist && fits(items, layout, item, { col, row })) {
                best = { col, row };
                bestDist = dist;
            }
        }
    }
    return best;
};

// Put `item` at `target`; tiles it lands on move into the slot it left (a swap) or, if they don't fit there,
// the open slot nearest to where they were
const moveTile = (items: MediaItemType[], layout: Layout, item: MediaItemType, target: Cell): Layout | null => {
    const from = layout[item.id];
    if (from.col === target.col && from.row === target.row) return null;
    const next = { ...layout };
    delete next[item.id];
    const bumped = items.filter((o) => next[o.id] && overlaps(target, spanOf(item), next[o.id], spanOf(o)));
    bumped.forEach((o) => delete next[o.id]);
    next[item.id] = target;
    for (const o of bumped) {
        next[o.id] = fits(items, next, o, from) ? from : nearestFree(items, next, o, layout[o.id]);
    }
    return next;
};

// Id of the tile under a viewport point, ignoring the tile being dragged
const tileIdAt = (x: number, y: number, exclude: number) => {
    for (const el of document.elementsFromPoint(x, y)) {
        const tile = (el as HTMLElement).closest<HTMLElement>("[data-tile-id]");
        if (tile) {
            const id = Number(tile.dataset.tileId);
            if (id !== exclude) return id;
        }
    }
    return null;
};

const LONG_PRESS_MS = 250; // touch: hold this long to pick a tile up (a quick swipe still scrolls the page)
const MOVE_TOLERANCE = 8; // touch: moving further than this before the hold completes means "scrolling"

interface GalleryTileProps {
    item: MediaItemType;
    index: number;
    cell: Cell;
    onOpen: (item: MediaItemType) => void;
    onDragMove: (item: MediaItemType, rect: DOMRect) => void;
    onDrop: (item: MediaItemType, rect: DOMRect) => void;
    suppressClick: () => void;
}

const GalleryTile = ({ item, index, cell, onOpen, onDragMove, onDrop, suppressClick }: GalleryTileProps) => {
    const controls = useDragControls();
    const tileRef = useRef<HTMLDivElement>(null);
    const press = useRef<{ timer: ReturnType<typeof setTimeout>; x: number; y: number } | null>(null);
    const touchDragging = useRef(false);
    const dragged = useRef(false); // true from drag start until just after release, so the release click doesn't open the viewer
    const [lifted, setLifted] = useState(false);

    // While a touch drag is active, cancel touchmove so the page doesn't scroll under the finger
    useEffect(() => {
        const el = tileRef.current;
        if (!el) return;
        const block = (e: TouchEvent) => {
            if (touchDragging.current) e.preventDefault();
        };
        el.addEventListener("touchmove", block, { passive: false });
        return () => el.removeEventListener("touchmove", block);
    }, []);

    const cancelPress = () => {
        if (press.current) clearTimeout(press.current.timer);
        press.current = null;
    };

    const endTouchDrag = () => {
        cancelPress();
        if (touchDragging.current) suppressClick(); // a hold-and-release shouldn't also open the viewer
        touchDragging.current = false;
        setLifted(false);
    };

    const handlePointerDown = (e: React.PointerEvent) => {
        if (e.pointerType !== "touch") {
            controls.start(e); // mouse / pen: drag straight away
            return;
        }
        const startEvent = e;
        press.current = {
            x: e.clientX,
            y: e.clientY,
            timer: setTimeout(() => {
                press.current = null;
                touchDragging.current = true;
                setLifted(true);
                navigator.vibrate?.(10);
                controls.start(startEvent);
            }, LONG_PRESS_MS),
        };
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        const p = press.current;
        if (p && Math.hypot(e.clientX - p.x, e.clientY - p.y) > MOVE_TOLERANCE) cancelPress();
    };

    const span = spanOf(item);
    const currentRect = () => tileRef.current!.getBoundingClientRect();

    return (
        <motion.div
            ref={tileRef}
            layoutId={`media-${item.id}`}
            data-tile-id={item.id}
            className={`relative overflow-hidden rounded-md sm:rounded-xl cursor-grab active:cursor-grabbing select-none [-webkit-touch-callout:none] ${
                lifted ? "ring-2 ring-white/70" : ""
            }`}
            onClick={() => {
                if (!dragged.current) onOpen(item);
            }}
            onContextMenu={(e) => e.preventDefault()} // Android long-press menu
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={endTouchDrag}
            onPointerCancel={endTouchDrag}
            variants={{
                hidden: { y: 50, scale: 0.9, opacity: 0 },
                visible: {
                    y: 0,
                    scale: 1,
                    opacity: 1,
                    transition: {
                        type: "spring",
                        stiffness: 350,
                        damping: 25,
                        delay: index * 0.05
                    }
                }
            }}
            whileHover={{ scale: 1.02 }}
            // Drop a tile on an open slot to move it there, or on another tile to swap places.
            // Snap-to-origin plus the layoutId layout animation glide it from the drop point into its new cell.
            // dragListener=false keeps normal touch scrolling; drags are started from handlePointerDown.
            drag
            dragListener={false}
            dragControls={controls}
            dragSnapToOrigin
            dragElastic={1}
            whileDrag={{ scale: 1.05, zIndex: 40, boxShadow: "0 20px 40px rgba(0,0,0,0.6)" }}
            style={{
                zIndex: 0,
                gridColumn: `${cell.col + 1} / span ${span.w}`,
                gridRow: `${cell.row + 1} / span ${span.h}`,
            }}
            onDragStart={() => {
                dragged.current = true;
            }}
            onDrag={() => onDragMove(item, currentRect())}
            onDragEnd={() => {
                onDrop(item, currentRect());
                endTouchDrag();
                // The release click fires before this; clear on the next tick in case it hasn't yet
                setTimeout(() => {
                    dragged.current = false;
                }, 0);
            }}
        >
            <MediaItem
                item={item}
                className="absolute inset-0 w-full h-full pointer-events-none"
            />
            <motion.div
                className="absolute inset-0 flex flex-col justify-end p-2 sm:p-3 md:p-4"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
            >
                <div className="absolute inset-0 flex flex-col justify-end p-2 sm:p-3 md:p-4">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <h3 className="relative text-white text-xs sm:text-sm md:text-base font-medium line-clamp-1">
                        {item.title}
                    </h3>
                    <p className="relative text-white/70 text-[10px] sm:text-xs md:text-sm mt-0.5 line-clamp-2">
                        {item.desc}
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
};

const InteractiveBentoGallery: React.FC<InteractiveBentoGalleryProps> = ({ mediaItems, title, description }) => {
    const [selectedItem, setSelectedItem] = useState<MediaItemType | null>(null);
    const [layout, setLayout] = useState(() => autoPlace(mediaItems));
    const [preview, setPreview] = useState<{ id: number; cell: Cell } | null>(null); // where the dragged tile would land
    const gridRef = useRef<HTMLDivElement>(null);
    const clickBlockedUntil = useRef(0); // Swallows the click that fires when a drag / hold is released

    const suppressClick = () => {
        clickBlockedUntil.current = Date.now() + 400;
    };

    const openItem = (item: MediaItemType) => {
        if (Date.now() < clickBlockedUntil.current) return;
        setSelectedItem(item);
    };

    // Grid cell the dragged tile is over, from its on-screen rect (mirrors the CSS column / row sizing below)
    const targetCell = (item: MediaItemType, rect: DOMRect): Cell | null => {
        const grid = gridRef.current;
        if (!grid) return null;
        const g = grid.getBoundingClientRect();
        const gap = parseFloat(getComputedStyle(grid).columnGap) || 0;
        const colStep = (g.width + gap) / COLS;
        const rowStep = ((colStep - gap) * 4 / 3 - 2 * gap) / 3 + gap;
        const span = spanOf(item);
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        // Over a same-shaped tile always means "swap with it", even if the drop is a little off
        const over = mediaItems.find((o) => o.id === tileIdAt(cx, cy, item.id));
        if (over && over.orientation === item.orientation) return layout[over.id];

        const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
        return {
            col: clamp(Math.round((cx - g.left) / colStep - span.w / 2), 0, COLS - span.w),
            row: clamp(Math.round((cy - g.top) / rowStep - span.h / 2), 0, bottomOf(mediaItems, layout, item.id)),
        };
    };

    const handleDragMove = (item: MediaItemType, rect: DOMRect) => {
        const cell = targetCell(item, rect);
        const from = layout[item.id];
        const next = cell && (cell.col !== from.col || cell.row !== from.row) ? { id: item.id, cell } : null;
        setPreview((prev) =>
            prev?.id === next?.id && prev?.cell.col === next?.cell.col && prev?.cell.row === next?.cell.row ? prev : next
        );
    };

    const handleDrop = (item: MediaItemType, rect: DOMRect) => {
        setPreview(null);
        const cell = targetCell(item, rect);
        const next = cell && moveTile(mediaItems, layout, item, cell);
        if (next) setLayout(next);
    };

    // Viewer / dock order follows the grid as currently arranged
    const orderedItems = [...mediaItems].sort(
        (a, b) => layout[a.id].row - layout[b.id].row || layout[a.id].col - layout[b.id].col
    );
    const previewItem = preview && mediaItems.find((o) => o.id === preview.id);

    return (
        <div className="w-full px-3 sm:px-6 lg:px-10 py-8">
            <div className="mb-8 text-center">
                <motion.h1
                    className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent
                             bg-gradient-to-r from-white via-gray-200 to-white"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.8, ease: EASE }}
                >
                    {title}
                </motion.h1>
                <motion.p
                    className="mt-2 text-sm sm:text-base text-gray-400"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
                >
                    {description}
                </motion.p>
                <p className="mt-1 text-xs text-gray-500 [@media(pointer:fine)]:hidden">
                    Press and hold a shot to drag it
                </p>
            </div>
            <AnimatePresence mode="wait">
                {selectedItem ? (
                    <GalleryModal
                        selectedItem={selectedItem}
                        isOpen={true}
                        onClose={() => setSelectedItem(null)}
                        setSelectedItem={setSelectedItem}
                        mediaItems={orderedItems}
                    />
                ) : (
                    // Row height follows column width (container query units) so a portrait tile
                    // (1 col x 3 rows) is always 3:4. Tiles are placed explicitly from `layout`, which starts
                    // as the staggered auto-placement with open slots that visitors can drag shots into.
                    <div style={{ containerType: "inline-size" }}>
                    <motion.div
                        ref={gridRef}
                        className="grid [--cols:4] [--gap:6px] sm:[--gap:10px] md:[--gap:12px]"
                        style={{
                            gridTemplateColumns: "repeat(var(--cols), minmax(0, 1fr))",
                            gap: "var(--gap)",
                            gridAutoRows:
                                "calc(((100cqw - (var(--cols) - 1) * var(--gap)) / var(--cols) * 4 / 3 - 2 * var(--gap)) / 3)",
                        }}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        exit="hidden"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.1 }
                            }
                        }}
                    >
                        {mediaItems.map((item, index) => (
                            <GalleryTile
                                key={item.id}
                                item={item}
                                index={index}
                                cell={layout[item.id]}
                                onOpen={openItem}
                                onDragMove={handleDragMove}
                                onDrop={handleDrop}
                                suppressClick={suppressClick}
                            />
                        ))}
                        {preview && previewItem && (
                            <div
                                aria-hidden
                                className="pointer-events-none rounded-md sm:rounded-xl border-2 border-dashed border-white/50 bg-white/5"
                                style={{
                                    gridColumn: `${preview.cell.col + 1} / span ${spanOf(previewItem).w}`,
                                    gridRow: `${preview.cell.row + 1} / span ${spanOf(previewItem).h}`,
                                }}
                            />
                        )}
                    </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};


export default InteractiveBentoGallery
