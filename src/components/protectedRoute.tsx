import { Navigate } from "react-router-dom";

type Props = {
    children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );


    if (!user) {
        return <Navigate to="/login" replace />;
    }


    if (user.mustChangePassword === true) {
        return (
            <Navigate
                to="/change-password"
                replace
            />
        );
    }


    return children;
}