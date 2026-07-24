import MainLayout from "../layouts/MainLayout";

function Dashboard() {

  const usuario =
    localStorage.getItem("usuario");

  const rol =
    localStorage.getItem("rol");

  return (

    <MainLayout>

      <h1>Dashboard</h1>

      <h2>
        Bienvenido {usuario}
      </h2>

      <p>
        Rol: {rol}
      </p>

    </MainLayout>

  );

}

export default Dashboard;
