import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const initialItems = [
    { id: "1", text: "Item 1" },
    { id: "2", text: "Item 2" },
    { id: "3", text: "Item 3" },
    { id: "4", text: "Item 4" },
];

function SortableItem({item}) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        padding: "10px",
        marginBottom: "8px",
        background: "white",
        borderRadius: "5px",
        boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
        cursor: "grab",
    };

    return (
        <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {item.text}
        </li>
    );
};

export default function DragDropList(){
    const [items, setItems] = useState(initialItems);

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = items.findIndex((item) => item.id === active.id);
            const newIndex = items.findIndex((item) => item.id === over.id);
            setItems(arrayMove(items, oldIndex, newIndex));
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Drag and Drop List</h2>
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={items} strategy={verticalListSortingStrategy}>
                    <ul className="bg-gray-100 p-4 rounded-lg">
                        {items.map((item) => (
                            <SortableItem key={item.id} item={item} />
                        ))}
                    </ul>
                </SortableContext>
            </DndContext>
        </div>
    );
};

