const Home = () => {
    return <div className="bg-gray-100">
    <main>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mx-auto">
            <div className="max-w-xl mx-auto" style={{minHeight: 'calc(100vh - 56px)'}}>
                <h2 className="text-9xl font-bold mb-4 bg-gradient-to-br from-emerald-700 to-slate-600 inline-block text-transparent bg-clip-text">Build Better Habits</h2>
                <h3 className="text-5xl mb-4">with <b>Mindex</b></h3>
                <p className="text-gray-600 mb-8">Track your progress, stay motivated, and reach your goals with our simple and effective habits tracking app.</p>
            </div>
            <div className="flex flex-wrap -mx-4">
              <div className="w-full md:w-1/3 px-4 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-bold mb-4">Easy to Use</h3>
                  <p className="text-gray-600">Our app is designed to be simple and intuitive, so you can start tracking your habits right away.</p>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-4 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-bold mb-4">Stay Motivated</h3>
                  <p className="text-gray-600">Set reminders and get daily insights to keep you on track and motivated to reach your goals.</p>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-4 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-bold mb-4">Track Your Progress</h3>
                  <p className="text-gray-600">See how far you have come and celebrate your achievements with our progress tracking features.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <footer className="bg-gray-800">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-300">© 2023 My Habits Tracker. All rights reserved.</p>
      </div>
    </footer>
  </div>
}

export default Home;