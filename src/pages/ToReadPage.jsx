import {useEffect, useState} from "react";
import {
    DndContext,
    closestCenter,
    useSensor,
    PointerSensor,
    MouseSensor,
    TouchSensor,
    KeyboardSensor, useSensors
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Header from "../components/Header.jsx";
import SideNav from "../components/SideNav.jsx";
import Footer from "../components/Footer.jsx";
import {deleteFromToReadList, fetchToReadList, reorderToReadList} from "../utils/http.jsx";


function SortableItem({item, setList}) {


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

    function removeFromListHandler(id){
        alert(id)
        deleteFromToReadList(window.localStorage.token, id).then((response)=>{
            setList(response.data.data)
        })
    }

    return (
        <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <table style={{width:"100%"}}>
                <tbody>
                    <tr>
                        <td rowSpan="2" style={{width:100}}>
                            <img style={{height: 150, width: 100}} src={item.book.image}/>
                        </td>
                        <td >
                            <h2>{item.book.title}</h2>
                        </td>
                    </tr>
                    <tr style={{borderBottom: "3px solid rgb(212, 212, 212)"}}>
                        <td>{item.book.description}</td>
                    </tr>
                    <tr>
                        <td rowSpan="2">
                            <button type="button"
                                    // onClick={()=>removeFromListHandler(item.id)}
                                    onClick={() => removeFromListHandler(item.book.id)}
                                    className="btn btn-danger">
                                <i className="far fa-trash-alt"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </li>
    );
};

export default function DragDropList() {
    const pointerSensor = useSensor(PointerSensor, {
        activationConstraint: {
            distance: 0.01
        }
    })
    const mouseSensor = useSensor(MouseSensor)
    const touchSensor = useSensor(TouchSensor)
    const keyboardSensor = useSensor(KeyboardSensor)

    const sensors = useSensors(
        mouseSensor,
        touchSensor,
        keyboardSensor,
        pointerSensor
    )
    const [items, setItems] = useState([{id: 1, book: {}}]);

    useEffect(() => {
        document.title = 'My Books - Reading List';
        fetchToReadList(window.localStorage.token).then(response => {
            setItems(response.data.data)
        })
    }, []);

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            reorderToReadList(window.localStorage.token, active.id, over.id).then( result =>{
                setItems(result.data)
            })
        }
    };


    return <div className="wrapper">
        <Header/>

        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Read List</h1>
                        </div>
                    </div>
                </div>
            </div>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} sensors={sensors}>
                                <SortableContext items={items} strategy={verticalListSortingStrategy}>
                                    <ol className="bg-gray-100 p-4 rounded-lg">
                                        {items.map((item) => (
                                            <SortableItem key={item.id} item={item} setList={setItems}/>
                                        ))}
                                    </ol>
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

