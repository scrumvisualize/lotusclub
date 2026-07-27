import { useEffect, useState } from "react";

import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    updateDoc
} from "firebase/firestore";

import { db } from "../firebase";


type NewsType =
    | "Club Update"
    | "Trip"
    | "Outing"
    | "Celebration";


interface ClubNewsData {

    id?: string;

    type:
    | "News"
    | "Update"
    | "Chit Funds"
    | "Other";


    title?: string;

    newsType?: NewsType;


    fundAmount?: string;

    numberOfPeople?: string;

    duration?: string;

    startDate?: string;

    endDate?: string;


    description: string;


    createdBy?: string;

    createdDate?: any;

}



const ClubNews = () => {


    const [newsList, setNewsList] =
        useState<ClubNewsData[]>([]);


    const [selectedType, setSelectedType] =
        useState<
            "News" | "Update" | "Chit Funds" | "Other"
        >("News");


    const [editingId, setEditingId] =
        useState<string | null>(null);



    const [form, setForm] =
        useState<Partial<ClubNewsData>>({

            description: ""

        });



    /*
        Load News
    */

    useEffect(() => {


        const q = query(

            collection(db, "clubNews"),

            orderBy(
                "createdDate",
                "desc"
            )

        );



        const unsubscribe =
            onSnapshot(q, (snapshot) => {


                const data =
                    snapshot.docs.map(item => ({

                        id: item.id,

                        ...item.data()

                    })) as ClubNewsData[];



                setNewsList(data);


            });



        return () => unsubscribe();


    }, []);






    const handleChange = (
        e:
            React.ChangeEvent<
                HTMLInputElement |
                HTMLTextAreaElement |
                HTMLSelectElement
            >

    ) => {


        setForm({

            ...form,

            [e.target.name]:
                e.target.value

        });


    };





    const resetForm = () => {


        setForm({

            description: ""

        });


        setSelectedType("News");

        setEditingId(null);


    };






    const saveNews = async () => {


        if (!form.description) {

            alert(
                "Description is required"
            );

            return;

        }




        const data = {


            ...form,


            type: selectedType,


            createdBy: "Admin"



        };





        if (editingId) {



            await updateDoc(

                doc(
                    db,
                    "clubNews",
                    editingId
                ),

                {

                    ...data,

                    updatedDate:
                        serverTimestamp()

                }

            );



        }
        else {


            await addDoc(

                collection(
                    db,
                    "clubNews"
                ),

                {

                    ...data,

                    createdDate:
                        serverTimestamp()

                }

            );


        }




        resetForm();


    };







    const editNews = (item: ClubNewsData) => {


        setSelectedType(
            item.type
        );


        setForm(item);


        setEditingId(
            item.id!
        );


        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });


    };







    const deleteNews = async (
        id: string
    ) => {


        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this?"
            );



        if (!confirmDelete)
            return;



        await deleteDoc(

            doc(
                db,
                "clubNews",
                id
            )

        );


    };







    return (

        <div className="
max-w-5xl
mx-auto
p-4
md:p-8
">


            <h1 className="
text-2xl
md:text-3xl
font-bold
mb-6
text-green-700
">

                Club News Management

            </h1>




            <div className="
bg-white
rounded-xl
shadow
p-5
space-y-4
">


                <select

                    value={selectedType}

                    onChange={
                        (e) =>
                            setSelectedType(
                                e.target.value as any
                            )

                    }

                    className="
w-full
border
rounded-lg
p-3
"


                >

                    <option>
                        News
                    </option>


                    <option>
                        Update
                    </option>


                    <option>
                        Chit Funds
                    </option>


                    <option>
                        Other
                    </option>


                </select>





                {
                    selectedType === "Chit Funds"

                        ?

                        <>


                            <input

                                name="fundAmount"

                                value={
                                    form.fundAmount || ""
                                }

                                placeholder="Fund Amount"

                                onChange={handleChange}

                                className="
input
"

                            />



                            <input

                                name="numberOfPeople"

                                value={
                                    form.numberOfPeople || ""
                                }

                                placeholder="No of People"

                                onChange={handleChange}

                                className="
input
"

                            />



                            <input

                                name="duration"

                                value={
                                    form.duration || ""
                                }

                                placeholder="Duration"

                                onChange={handleChange}

                                className="
input
"

                            />



                            <div className="
grid
md:grid-cols-2
gap-4
">


                                <input

                                    type="date"

                                    name="startDate"

                                    value={
                                        form.startDate || ""
                                    }

                                    onChange={handleChange}

                                    className="
input
"

                                />


                                <input

                                    type="date"

                                    name="endDate"

                                    value={
                                        form.endDate || ""
                                    }

                                    onChange={handleChange}

                                    className="
input
"

                                />


                            </div>



                        </>


                        :

                        <>


                            <input

                                name="title"

                                value={
                                    form.title || ""
                                }

                                placeholder="News Title"

                                onChange={handleChange}

                                className="
input
"

                            />



                            <select

                                name="newsType"

                                value={
                                    form.newsType || "Club Update"
                                }

                                onChange={handleChange}

                                className="
input
"

                            >


                                <option>
                                    Club Update
                                </option>

                                <option>
                                    Trip
                                </option>

                                <option>
                                    Outing
                                </option>

                                <option>
                                    Celebration
                                </option>


                            </select>



                        </>

                }






                <textarea

                    name="description"

                    value={
                        form.description || ""
                    }

                    placeholder="Description"

                    rows={5}

                    onChange={handleChange}

                    className="
w-full
border
rounded-lg
p-3
"

                />





                <div className="flex gap-3">


                    <button

                        onClick={saveNews}

                        className="
                        bg-green-600
                        text-white
                        px-6
                        py-3
                        rounded-lg
                        "

                    >

                        {
                            editingId
                                ?
                                "Update News"
                                :
                                "Save News"

                        }

                    </button>




                    {
                        editingId &&

                        <button

                            onClick={resetForm}

                            className="
                            bg-gray-400
                            text-white
                            px-6
                            py-3
                            rounded-lg
                            "

                        >

                            Cancel

                        </button>

                    }



                </div>


            </div>








            <div className="
                mt-8
                space-y-4
                ">


                {
                    newsList.map(item => (


                        <div

                            key={item.id}

                            className="
                                border
                                rounded-xl
                                p-5
                                shadow-sm
                                bg-gray-50
                                "


                        >


                            <div className="
                                flex
                                justify-between
                                gap-3
                                flex-wrap
                                ">


                                <div>

                                    <h2 className="
                                    font-bold
                                    text-lg
                                    ">

                                        {
                                            item.title ||
                                            "Chit Fund"

                                        }

                                    </h2>


                                    <p className="
                                        text-sm
                                        text-gray-500
                                        ">

                                        Type:
                                        {item.type}

                                    </p>


                                </div>



                                <div className="flex gap-2">


                                    <button

                                        onClick={() =>
                                            editNews(item)
                                        }

                                        className="
                                        bg-blue-600
                                        text-white
                                        px-3
                                        py-1
                                        rounded
                                        "
                                    >

                                        Edit

                                    </button>



                                    <button

                                        onClick={() =>
                                            deleteNews(item.id!)
                                        }

                                        className="
                                        bg-red-600
                                        text-white
                                        px-3
                                        py-1
                                        rounded
                                        "
                                    >

                                        Delete

                                    </button>



                                </div>


                            </div>



                            <p className="
                                mt-3
                                text-gray-700
                                ">

                                {item.description}

                            </p>



                            {
                                item.type === "Chit Funds" &&

                                <div className="mt-3 text-sm">

                                    <p>
                                        Amount: ${item.fundAmount}
                                    </p>

                                    <p>
                                        Members: {item.numberOfPeople}
                                    </p>

                                    <p>
                                        Duration: {item.duration}
                                    </p>

                                </div>

                            }



                        </div>


                    ))

                }



            </div>



        </div>

    );


};


export default ClubNews;