import { Navigate } from "react-router-dom";

type Props = {
    children: React.ReactNode;
    adminOnly?: boolean;
};

export default function ProtectedRoute({ children, adminOnly = false }: Props) {

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );


    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Force password change
    if (user.mustChangePassword === true) {
        return (
            <Navigate
                to="/change-password"
                replace
            />
        );
    }

    // Admin-only pages
    if (adminOnly && user.role !== "admin") {
        console.log("Blocked - not admin");
        return (
            <Navigate
                to="/"
                replace
            />
        );
    }


    return children;
}