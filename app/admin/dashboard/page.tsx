import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
// Import all four Firebase functions
import {
  getBookings,
  countBookings,
  countResources,
  countUsers,
  getBookingsByDate,
} from "@/lib/firebase";

export default async function Page() {
  // Fetch all the data
  const bookingsData = await getBookings();
  const totalBookings = await countBookings();
  const totalResources = await countResources();
  const totalUsers = await countUsers();
  // Fetch the chart data
  const chartData = await getBookingsByDate();

  const formattedData = bookingsData.map((booking, index) => ({
    id: index,
    facility: booking.resourceName || "N/A",
    status: "In Progress",
    time: booking.start ? new Date(booking.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "N/A",
    // Add the date property here
    date: booking.start ? new Date(booking.start).toLocaleDateString() : "N/A",
    name: booking.name || "N/A",
  }));

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards 
                totalBookings={totalBookings} 
                totalResources={totalResources}
                totalUsers={totalUsers}
              />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive chartData={chartData} />
              </div>
              <DataTable data={formattedData} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
