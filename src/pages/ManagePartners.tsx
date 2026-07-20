
import { useEffect, useState } from "react";

import {
    addDoc,
    collection,
    serverTimestamp,
    onSnapshot,
    deleteDoc,
    doc,
    orderBy,
    query,
    updateDoc
} from "firebase/firestore";

import { db } from "../firebase";
import { Trash2 } from "lucide-react";

type Partner = {
    id: string;
    name: string;
    category: string;
    description?: string;
    logoUrl?: string;
    websiteUrl?: string;
    displayOrder?: number;
};

const ManagePartners = () => {


    const [name, setName] = useState("");
    const [category, setCategory] = useState("Restaurant");
    const [description, setDescription] = useState("");
    const [websiteUrl, setWebsiteUrl] = useState("");
    const [displayOrder, setDisplayOrder] = useState(1);
    const [logoUrl, setLogoUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [partners, setPartners] = useState<Partner[]>([]);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [message, setMessage] = useState<{
        type: "success" | "error";
        text: string;
    } | null>(null);

    const [editingPartner, setEditingPartner] =
        useState<Partner | null>(null);



    const savePartner = async () => {


        if (
            !name ||
            !description
        ) {

            setMessage({
                type: "error",
                text: "Please fill all required fields"
            });

            return;
        }



        try {

            setLoading(true);

            const partnerData = {

                name,
                category,
                description,
                websiteUrl,
                logoUrl,
                displayOrder: Number(displayOrder),
                active: true
            };

            if (editingPartner) {

                await updateDoc(

                    doc(
                        db,
                        "partners",
                        editingPartner.id
                    ),

                    partnerData
                );

                setMessage({

                    type: "success",

                    text: "Partner updated successfully"

                });

            }

            else {

                await addDoc(

                    collection(
                        db,
                        "partners"
                    ),

                    {

                        ...partnerData,

                        createdAt: serverTimestamp()

                    }
                );

                setMessage({

                    type: "success",

                    text: "Partner added successfully"

                });

            }

            setName("");
            setCategory("Restaurant");
            setDescription("");
            setWebsiteUrl("");
            setLogoUrl("");
            setDisplayOrder(1);

            setEditingPartner(null);

        }
        catch (error) {

            console.error(
                error
            );

            setMessage({
                type: "error",
                text: "Unable to save partner"
            });

        }
        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        const q = query(
            collection(db, "partners"),
            orderBy("displayOrder", "asc")
        );


        const unsubscribe = onSnapshot(q, (snapshot) => {

            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Partner[];


            setPartners(data);

        });


        return () => unsubscribe();

    }, []);


    const deletePartner = async () => {

        if (!deleteId) return;


        try {

            await deleteDoc(
                doc(db, "partners", deleteId)
            );


            setDeleteId(null);


        }
        catch (error) {

            console.error(error);

            alert(
                "Unable to delete partner"
            );

        }

    };

    const editPartner = (

        partner: Partner

    ) => {

        setEditingPartner(partner);

        setName(partner.name);

        setCategory(partner.category);

        setDescription(
            partner.description || ""
        );

        setWebsiteUrl(
            partner.websiteUrl || ""
        );

        setLogoUrl(
            partner.logoUrl || ""
        );

        setDisplayOrder(
            partner.displayOrder || 1
        );

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    };


    return (

        <div
            className="
            min-h-screen
            bg-gray-100
            dark:bg-slate-950
            p-4
            sm:p-6
            "
        >

            <div
                className="
                max-w-7xl
                mx-auto
                grid
                grid-cols-1
                lg:grid-cols-2
                gap-6
                lg:gap-8
                items-start
                "
            >


                {/* =========================
            ADD PARTNER SECTION
        ========================== */}

                <div
                    className="
                    bg-white
                    dark:bg-slate-900
                    rounded-3xl
                    shadow-xl
                    p-5
                    sm:p-8
                    "
                >

                    <h1
                        className="
                        text-2xl
                        sm:text-3xl
                        font-bold
                        text-center
                        dark:text-white
                        "
                    >

                        {
                            editingPartner
                                ? "✏️ Edit Partner"
                                : "🤝 Add Partner or Advertisement"
                        }

                    </h1>


                    <div
                        className="
                    mt-6
                    space-y-4
                "
                    >

                        <input
                            placeholder="Partner Name"
                            value={name}
                            onChange={
                                e => setName(e.target.value)
                            }
                            className="
                            w-full
                            px-4
                            py-3
                            rounded-xl
                            border
                            dark:bg-slate-800
                            dark:text-white
                            "
                        />


                        <select
                            value={category}
                            onChange={
                                e => setCategory(e.target.value)
                            }
                            className="
                            w-full
                            px-4
                            py-3
                            rounded-xl
                            border
                            dark:bg-slate-800
                            dark:text-white
                            "
                        >

                            <option>Restaurant</option>
                            <option>Soccer Club</option>
                            <option>Business Sponsor</option>
                            <option>Community Partner</option>

                        </select>



                        <textarea
                            placeholder="Description"
                            value={description}
                            maxLength={150}
                            rows={4}
                            onChange={
                                e => setDescription(e.target.value)
                            }
                            className="
                            w-full
                            px-4
                            py-3
                            rounded-xl
                            border
                            dark:bg-slate-800
                            dark:text-white
                            "
                        />



                        <input
                            placeholder="Website URL"
                            value={websiteUrl}
                            onChange={
                                e => setWebsiteUrl(e.target.value)
                            }
                            className="
                            w-full
                            px-4
                            py-3
                            rounded-xl
                            border
                            dark:bg-slate-800
                            dark:text-white
                            "
                        />



                        <input
                            placeholder="Logo URL (optional)"
                            value={logoUrl}
                            onChange={
                                e => setLogoUrl(e.target.value)
                            }
                            className="
                            w-full
                            px-4
                            py-3
                            rounded-xl
                            border
                            dark:bg-slate-800
                            dark:text-white
                            "
                        />



                        <input
                            type="number"
                            value={displayOrder}
                            onChange={
                                e =>
                                    setDisplayOrder(
                                        Number(e.target.value)
                                    )
                            }
                            className="
                            w-full
                            px-4
                            py-3
                            rounded-xl
                            border
                            dark:bg-slate-800
                            dark:text-white
                            "
                        />



                        <button
                            disabled={loading}
                            onClick={savePartner}
                            className="
                            w-full
                            py-3
                            rounded-full
                            bg-blue-600
                            text-white
                            font-semibold
                            hover:bg-blue-700
                            transition
                            "
                        >

                            {
                                loading
                                    ? "Saving..."
                                    : editingPartner
                                        ? "Update Partner"
                                        : "Save Partner"
                            }

                        </button>


                    </div>


                </div>





                {/* =========================
            MANAGE PARTNERS SECTION
        ========================== */}


                <div
                    className="
                    bg-white
                    dark:bg-slate-900
                    rounded-3xl
                    shadow-xl
                    p-5
                    sm:p-8
                    "
                >


                    <h2
                        className="
                        text-2xl
                        font-bold
                        text-center
                        dark:text-white
                        "
                    >
                        Manage Partners
                    </h2>



                    <div
                        className="
                        mt-6
                        space-y-4
                        max-h-[650px]
                        overflow-y-auto
                        pr-2
                        "
                    >


                        {
                            partners.length === 0 ?

                                (
                                    <div
                                        className="
                            text-center
                            py-10
                            text-gray-500
                        "
                                    >
                                        No partners available
                                    </div>
                                )

                                :

                                partners.map(partner => (

                                    <div
                                        key={partner.id}
                                        onClick={() =>
                                            editPartner(partner)
                                        }

                                        className="
                                        flex
                                        items-center
                                        justify-between
                                        gap-3
                                        p-4
                                        rounded-2xl
                                        border
                                        dark:border-slate-700
                                        hover:shadow-md
                                        transition
                                        "
                                    >


                                        <div
                                            className="
                                            flex
                                            items-center
                                            gap-4
                                            min-w-0
                                            "
                                        >


                                            <img
                                                src={
                                                    partner.logoUrl
                                                        ?
                                                        partner.logoUrl
                                                        :
                                                        `https://www.google.com/s2/favicons?domain=${partner.websiteUrl}&sz=64`
                                                }
                                                alt={partner.name}
                                                className="
                                                w-12
                                                h-12
                                                rounded-xl
                                                object-contain
                                                bg-gray-100
                                                p-2
                                                flex-shrink-0
                                                "
                                            />



                                            <div className="min-w-0">

                                                <h3
                                                    className="
                                                    font-semibold
                                                    dark:text-white
                                                    truncate
                                                    "
                                                >
                                                    {partner.name}
                                                </h3>


                                                <p
                                                    className="
                                                    text-sm
                                                    text-gray-500
                                                    "
                                                >
                                                    {partner.category}
                                                </p>

                                            </div>

                                        </div>


                                        <button
                                            onClick={() =>
                                                setDeleteId(partner.id)
                                            }
                                            className="
                                            p-2
                                            rounded-full
                                            text-red-500
                                            hover:bg-red-50
                                            dark:hover:bg-red-900/30
                                            "
                                        >

                                            <Trash2 size={20} />

                                        </button>


                                    </div>


                                ))

                        }


                    </div>


                </div>


            </div>

            {
                deleteId && (

                    <div
                        className="
                        fixed
                        inset-0
                        z-50
                        bg-black/50
                        flex
                        items-center
                        justify-center
                        p-5
                        "
                    >

                        <div
                            className="
                        bg-white
                        dark:bg-slate-900
                        rounded-3xl
                        shadow-2xl
                        p-6
                        w-full
                        max-w-sm
                        text-center
                        "
                        >

                            <h2
                                className="
                                text-xl
                                font-bold
                                text-slate-800
                                dark:text-white
                                "
                            >
                                Delete Partner?
                            </h2>


                            <p
                                className="
                            mt-3
                            text-gray-500
                            dark:text-gray-400
                            "
                            >
                                Are you sure you want to remove this partner?
                            </p>



                            <div
                                className="
                                mt-6
                                flex
                                justify-center
                                gap-4
                                "
                            >

                                <button
                                    onClick={() =>
                                        setDeleteId(null)
                                    }
                                    className="
                                        px-5
                                        py-2
                                        rounded-full
                                        border
                                        border-gray-300
                                        dark:border-slate-600
                                       "
                                >
                                    Cancel
                                </button>



                                <button
                                    onClick={deletePartner}
                                    className="
                                        px-5
                                        py-2
                                        rounded-full
                                        bg-red-600
                                        text-white
                                        hover:bg-red-700
                                        transition
                                        "
                                >
                                    Delete
                                </button>


                            </div>


                        </div>


                    </div>

                )
            }

            {
                message && (

                    <div
                        className="
                        fixed
                        inset-0
                        z-50
                        bg-black/50
                        flex
                        items-center
                        justify-center
                        p-5
                        "
                    >

                        <div
                            className="
                            bg-white
                            dark:bg-slate-900
                            rounded-3xl
                            shadow-2xl
                            p-6
                            w-full
                            max-w-sm
                            text-center
                            "
                        >

                            <h2
                                className={`
                            text-xl
                            font-bold
                            ${message.type === "success"
                                        ?
                                        "text-green-600"
                                        :
                                        "text-red-600"
                                    }
                            `}
                            >

                                {
                                    message.type === "success"
                                        ?
                                        "Success"
                                        :
                                        "Missing fields"
                                }

                            </h2>



                            <p
                                className="
                                mt-3
                                text-gray-600
                                dark:text-gray-300
                                "
                            >
                                {message.text}
                            </p>



                            <button
                                onClick={() =>
                                    setMessage(null)
                                }
                                className="
                                mt-6
                                px-6
                                py-2
                                rounded-full
                                bg-blue-600
                                text-white
                                hover:bg-blue-700
                                "
                            >
                                OK
                            </button>


                        </div>


                    </div>

                )
            }


        </div>

    );

};


export default ManagePartners;