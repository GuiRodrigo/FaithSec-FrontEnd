import { Dashboard } from "@/components/layout/Dashboard";
import { Login } from "@/components/layout/Login";
import { useAuth } from "@/hooks/auth";

export default function Home() {
  const { isLogged } = useAuth();

  return <div>{isLogged ? <Dashboard /> : <Login />}</div>;
}
