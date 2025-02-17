import { CitizenEducationChart } from "@/components/fragments/citizen-education-chart";
import { CitizenGenderChart } from "@/components/fragments/citizen-gender-chart";
import { CitizenLocationChart } from "@/components/fragments/citizen-location-chart";
import { CitizenRaceChart } from "@/components/fragments/citizen-race-chart";
import { CitizenReligionChart } from "@/components/fragments/citizen-religion-chart";

export default function Home() {
  return (
    <div className="flex flex-1 p-4 md:px-6">
      <div className="flex flex-1 flex-col space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Grafik Penduduk Indonesia 2024
          </h2>
        </div>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12'>
          <div className="col-span-4">
            <CitizenGenderChart />
          </div>
          <div className="col-span-4">
            <CitizenEducationChart />
          </div>
          <div className="col-span-4">
            <CitizenReligionChart />
          </div>
          <div className="col-span-6">
            <CitizenRaceChart />
          </div>
          <div className="col-span-6">
            <CitizenLocationChart />
          </div>
        </div>
      </div>
    </div>
  );
}
