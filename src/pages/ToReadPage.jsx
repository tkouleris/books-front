import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Header from "../components/Header.jsx";
import SideNav from "../components/SideNav.jsx";
import Footer from "../components/Footer.jsx";

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

    return <div className="wrapper">
        <Header/>

        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Profile</h1>
                        </div>
                    </div>
                </div>
            </div>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                                <SortableContext items={items} strategy={verticalListSortingStrategy}>
                                    <ul className="bg-gray-100 p-4 rounded-lg">
                                        {items.map((item) => (
                                            <SortableItem key={item.id} item={item}/>
                                        ))}
                                    </ul>
                                </SortableContext>
                            </DndContext>
                        </div>


                    </div>

                </div>

            </section>
        </div>


        <SideNav/>
        <Footer/>
    </div>;

};

