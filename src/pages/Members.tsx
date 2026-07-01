export default function Members() {

    const members = [
        {
            id: 1,
            name: "Dan Thomas",
            membership: "Permanent",
            status: "Active",
            joiningYear: "2020",
        },
        {
            id: 2,
            name: "Vinod Mathew",
            membership: "Permanent",
            status: "Active",
            joiningYear: "2022",
        },
        {
            id: 3,
            name: "Tran Don",
            membership: "Guest",
            status: "Active",
            joiningYear: "2023",
        },
        {
            id: 4,
            name: "Great Man",
            membership: "Guest",
            status: "Cancelled",
            joiningYear: "2024",
        },
    ];

    return (

        <section
            id="members"
            className="
            py-20
            bg-white
            dark:bg-slate-900
            transition-colors
            duration-500
            "
        >

            <div className="max-w-7xl mx-auto px-6">

                {/* Heading */}

                <div className="text-center">

                    <h2
                        className="
                        text-4xl
                        md:text-5xl
                        font-bold
                        text-slate-800
                        dark:text-white
                        "
                    >
                        Members List
                    </h2>

                    <p
                        className="
                        mt-3
                        text-lg
                        text-gray-600
                        dark:text-gray-300
                        "
                    >
                        Membership List for the Year 2026 / 2027
                    </p>

                </div>


                {/* Table */}

                <div
                    className="
                    mt-12
                    overflow-x-auto
                    rounded-2xl
                    shadow-xl
                    "
                >

                    <table
                        className="
                        min-w-full
                        bg-white
                        dark:bg-slate-800
                        "
                    >

                        <thead>

                            <tr
                                className="
                                bg-blue-600
                                text-white
                                "
                            >

                                <th className="px-6 py-4 text-left">
                                    Serial No
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Full Name
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Membership Type
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Status
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Year of Joining
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {members.map((member) => (

                                <tr
                                    key={member.id}
                                    className="
                                    border-b
                                    border-gray-200
                                    dark:border-slate-700
                                    hover:bg-blue-50
                                    dark:hover:bg-slate-700
                                    transition
                                    "
                                >

                                    <td className="px-6 py-4">
                                        {member.id}
                                    </td>

                                    <td className="px-6 py-4 font-medium">
                                        {member.name}
                                    </td>

                                    <td className="px-6 py-4">
                                        {member.membership}
                                    </td>

                                    <td className="px-6 py-4">

                                        <span
                                            className={`
                                            px-3
                                            py-1
                                            rounded-full
                                            text-sm
                                            font-medium

                                    ${member.status === "Active"
                                                    ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                                    : member.status === "Cancelled"
                                                        ? "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300"
                                                        : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                                                }
                                    `}
                                        >
                                            {member.status}
                                        </span>

                                    </td>

                                    <td className="px-6 py-4">
                                        {member.joiningYear}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </section>

    );

}