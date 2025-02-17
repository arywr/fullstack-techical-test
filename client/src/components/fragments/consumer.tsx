type ConsumerProps = {
  data: string[]
}

export function Consumer(props: ConsumerProps) {
  return (
    <>
      <header className="flex items-center justify-between px-4 py-2 border-b">
        <h1 className="text-lg font-semibold">Consumer</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {props?.data?.map((el, index) => (
          <div key={index} className="p-2 rounded-lg bg-blue-500 text-white">
            <p className="text-sm">{el}</p>
          </div>
        ))}
      </main>
    </>
  )
}