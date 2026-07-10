export default function Contact() {
    return (
        <div className="max-w-xl mx-auto p-10">

            <h1 className="text-4xl font-bold text-blue-600 mb-6">
                Contact
            </h1>

            <form className="space-y-5">

                <input
                    type="text"
                    placeholder="Name"
                    className="
                    w-full border rounded-lg p-3 
                    bg-white
                    text-gray-900
                    placeholder-gray-500

                    dark:bg-slate-700
                    dark:text-white
                    dark:placeholder-gray-300"
                />

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border rounded-lg 
                    bg-white
                    text-gray-900
                    placeholder-gray-500

                    dark:bg-slate-700
                    dark:text-white
                    dark:placeholder-gray-300
                    p-3"
                />

                <textarea
                    rows={5}
                    placeholder="Message"
                    className="w-full border rounded-lg 
                    bg-white
                    text-gray-900
                    placeholder-gray-500

                    dark:bg-slate-700
                    dark:text-white
                    dark:placeholder-gray-300
                    p-3"
                />

                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                    Send Message
                </button>

            </form>

        </div>
    );
}