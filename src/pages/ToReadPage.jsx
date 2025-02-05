import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const initialItems = [
    { id: "1", text: "Item 1" },
    { id: "2", text: "Item 2" },
    { id: "3", text: "Item 3" },
    { id: "4", text: "Item 4" }
];

export default function ToReadPage(){
    const [items, setItems] = useState(initialItems);

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const updatedItems = Array.from(items);
        const [movedItem] = updatedItems.splice(result.source.index, 1);
        updatedItems.splice(result.destination.index, 0, movedItem);

        setItems(updatedItems);
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Drag and Drop List</h2>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="droppable-list">
                    {(provided) => (
                        <ul
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="bg-gray-100 p-4 rounded-lg"
                        >
                            {items.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided) => (
                                        <li
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="bg-white p-2 mb-2 rounded-lg shadow-md cursor-pointer"
                                        >
                                            {item.text}
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

