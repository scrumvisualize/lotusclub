import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Phone } from "lucide-react";
import lotusLogo from "../assets/lotuslogo.png";

const lotusIcon = L.divIcon({
    className: "",
    html: `
        <div style="
            width:55px;
            height:55px;
            border-radius:50%;
            overflow:hidden;
            border:3px solid white;
            box-shadow:0 2px 8px rgba(0,0,0,0.4);
            background:white;
        ">
            <img 
                src="${lotusLogo}" 
                style="
                    width:100%;
                    height:100%;
                    object-fit:cover;
                "
            />
        </div>
    `,
    iconSize: [55, 55],
    iconAnchor: [27, 55],
    popupAnchor: [0, -50],
});


export default function Contact() {

    const location: [number, number] = [
        -27.6623,
        153.0408
    ];


    return (
        <div className="max-w-7xl mx-auto px-6 py-10">

            <h1 className="text-4xl font-bold text-blue-600 mb-8">
                Contact
            </h1>


            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">


                {/* LEFT SIDE - CONTACT FORM */}
                <div>

                    <form className="space-y-5">

                        <input
                            type="text"
                            placeholder="Name"
                            className="
                            w-full border rounded-lg p-3
                            bg-white text-gray-900
                            placeholder-gray-500
                            dark:bg-slate-700
                            dark:text-white
                            dark:placeholder-gray-300"
                        />


                        <input
                            type="email"
                            placeholder="Email"
                            className="
                            w-full border rounded-lg p-3
                            bg-white text-gray-900
                            placeholder-gray-500
                            dark:bg-slate-700
                            dark:text-white
                            dark:placeholder-gray-300"
                        />


                        <textarea
                            rows={6}
                            placeholder="Message"
                            className="
                            w-full border rounded-lg p-3
                            bg-white text-gray-900
                            placeholder-gray-500
                            dark:bg-slate-700
                            dark:text-white
                            dark:placeholder-gray-300"
                        />


                        <button
                            className="
                            bg-blue-600 
                            text-white 
                            px-6 
                            py-3 
                            rounded-lg
                            hover:bg-blue-700
                            transition"
                        >
                            Send Message
                        </button>

                    </form>

                </div>



                {/* RIGHT SIDE - MAP */}
                <div className="space-y-5">


                    <div className="
                        overflow-hidden
                        rounded-xl
                        shadow-lg
                        border
                    ">


                        <MapContainer
                            center={location}
                            zoom={15}
                            scrollWheelZoom={false}
                            className="h-[350px] w-full"
                        >


                            <TileLayer
                                attribution="&copy; OpenStreetMap contributors"
                                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />


                            <Marker
                                position={location}
                                icon={lotusIcon}
                            >

                                <Popup>

                                    <div className="text-center">


                                        <img
                                            src={lotusLogo}
                                            alt="Lotus Club"
                                            className="
                                            w-16 
                                            h-16 
                                            mx-auto 
                                            mb-2"
                                        />


                                        <h3 className="font-bold text-lg">
                                            Lotus Club
                                        </h3>


                                        <p>
                                            4 Fern St
                                        </p>

                                        <p>
                                            Browns Plains
                                        </p>

                                        <p>
                                            Brisbane, QLD 4118
                                        </p>


                                        {/* <a
                                            href="https://www.google.com/maps/search/?api=1&query=4+Fern+St+Browns+Plains+QLD+4118"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="
                                            inline-block
                                            mt-3
                                            bg-blue-800
                                            text-white
                                            px-3
                                            py-2
                                            rounded
                                            text-sm"
                                        >
                                            Get Directions
                                        </a> */}


                                    </div>

                                </Popup>


                            </Marker>


                        </MapContainer>


                    </div>



                    {/* ADDRESS BELOW MAP */}

                    <div
                        className="
                        p-5
                        rounded-xl
                        border
                        bg-white
                        dark:bg-slate-800
                        dark:border-slate-700"
                    >

                        <h2 className="text-xl font-semibold mb-3">
                            Club Address:
                        </h2>


                        <p>
                            4 Fern St,
                        </p>

                        <p>
                            Browns Plains,
                        </p>

                        <p>
                            Brisbane, QLD 4118
                        </p>

                        {/* PHONE */}
                        <div className="flex items-center gap-3 mt-5">

                            <Phone
                                size={20}
                                className="text-blue-600"
                            />

                            <a
                                href="tel:+61426000111"
                                className="
                                text-gray-700
                                dark:text-gray-300
                                hover:text-blue-600
                                "
                            >
                                +61 426000111
                            </a>

                        </div>


                    </div>


                </div>


            </div>


        </div>
    );
}