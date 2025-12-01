import ClientDepartmentDashboard, { type DeptInfo } from './ClientDepartmentDashboard'

const DEPARTMENT_INFO: Record<string, DeptInfo> = {
  reservation: {
    name: 'Rezarvasyon Departmanı',
    color: 'blue',
    icon: '🎫',
    features: ['Rezervasyon Yönetimi', 'Müşteri Bilgileri', 'Ödeme İşlemleri', 'Raporlar'],
  },
  aircraft: {
    name: 'Uçak Departmanı',
    color: 'orange',
    icon: '✈️',
    features: ['Uçak Envanteri', 'Bakım Zamanlaması', 'Teknik Raporlar', 'Muayene Kayıtları'],
  },
  operations: {
    name: 'Operasyon Departmanı',
    color: 'green',
    icon: '⚙️',
    features: ['Uçuş Planlaması', 'Rota Yönetimi', 'Personel Görevlendirmesi', 'İstatistikler'],
  },
  management: {
    name: 'Yönetim Departmanı',
    color: 'purple',
    icon: '📊',
    features: ['Bütçe Yönetimi', 'KPI Analizi', 'Strateji Planlama', 'Karar Desteği'],
  },
}

export function generateStaticParams() {
  return Object.keys(DEPARTMENT_INFO).map((department) => ({ department }))
}

export default function DepartmentPage({ params }: { params: { department: string } }) {
  const deptInfo = DEPARTMENT_INFO[params.department]
  if (!deptInfo) return null
  return <ClientDepartmentDashboard department={params.department} deptInfo={deptInfo} />
}
