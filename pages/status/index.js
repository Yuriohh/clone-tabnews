import useSWR from "swr";

async function fetchApi(key) {
  const response = await fetch(key);
  const responseBody = await response.json();

  return responseBody;
}

export default function StatusPage() {

  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DatabaseStatus />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("http://localhost:3000/api/v1/status", fetchApi, {
    refreshInterval: 2000,
  });

  let updatedAtText = 'Carregando...';

  return (
    <div>
      <p>Última atualização: {updatedAtText}</p>
    </div>
  );
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR('http://localhost:3000/api/v1/status', fetchApi, {
    refreshInterval: 2000,
  });

  let databaseStatusInformation = 'Carregando...';

  if (!isLoading && data) {
    databaseStatusInformation = (
      <>
        <div>Versão: {data.dependencies.database.version}</div>
        <div>
          Conexões abertas: {data.dependencies.database.opened_connections}
        </div>
        <div>
          Conexões máximas: {data.dependencies.database.max_connections}
        </div>
      </>
    );
  }

  return (
    <>
      <h2>Database</h2>
      <div>{databaseStatusInformation}</div>
    </>
  );
}
