import {
    Users,
    FolderKanban,
    LayoutDashboard,
    Server,
    Ban,
    Users2,
  } from 'lucide-react'
  
  export default function Home() {
    return (
      <main className="py-10 px-6 bg-gray-50 min-h-full">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Bienvenido a SENAGEST</h1>
          <p className="mt-1 text-gray-600">Sistema de Gestión ERP del SENA</p>
        </div>
  
        {/* Métricas principales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            {
              name: 'Aprendices activos',
              value: '2.340',
              icon: <Users className="h-6 w-6 text-indigo-600" />,
            },
            {
              name: 'Procesos abiertos',
              value: '128',
              icon: <FolderKanban className="h-6 w-6 text-indigo-600" />,
            },
            {
              name: 'Módulos habilitados',
              value: '12',
              icon: <LayoutDashboard className="h-6 w-6 text-indigo-600" />,
            },
          ].map((item) => (
            <div
              key={item.name}
              className="bg-white overflow-hidden shadow rounded-lg px-4 py-5 sm:p-6 flex items-center space-x-4"
            >
              <div>{item.icon}</div>
              <div>
                <dt className="text-sm font-medium text-gray-500">{item.name}</dt>
                <dd className="mt-1 text-xl font-semibold text-gray-900">{item.value}</dd>
              </div>
            </div>
          ))}
        </div>
  
        {/* Paneles de info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Módulos disponibles */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">Módulos disponibles</h2>
              <ul className="space-y-4">
                {[
                  { name: 'Modulos', icon: Server },
                  { name: 'Permisos', icon: Ban },
                  { name: 'Usuarios', icon: Users2 },
                ].map((mod) => (
                  <li key={mod.name} className="flex items-start space-x-3">
                    <mod.icon className="h-5 w-5 text-indigo-500 mt-1" />
                    <span className="text-sm text-gray-700">{mod.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
  
          {/* Últimas novedades */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">Últimas novedades</h2>
              <ul className="space-y-3 text-sm text-gray-700">
                <li>✅ Actualización del módulo de Permisos (Abr 2025)</li>
                <li>🚀 Nuevo panel de métricas para coordinadores</li>
                <li>📢 Integración con plataforma LMS en pruebas</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    )
  }
  