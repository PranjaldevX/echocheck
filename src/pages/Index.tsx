import { useState } from "react";
import { LoginPage } from "@/components/LoginPage";
import { TeacherDashboard } from "@/components/TeacherDashboard";
import { StudentInterface } from "@/components/StudentInterface";

type UserRole = "teacher" | "student" | null;

const Index = () => {
  const [userRole, setUserRole] = useState<UserRole>(null);

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
  };

  const handleLogout = () => {
    setUserRole(null);
  };

  if (!userRole) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (userRole === "teacher") {
    return <TeacherDashboard onLogout={handleLogout} />;
  }

  if (userRole === "student") {
    return <StudentInterface onLogout={handleLogout} />;
  }

  return null;
};

export default Index;
