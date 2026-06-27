"use client";

import ModalProvider from "./src/context/modal.provider";

const Home = () => {
  return (
    <ModalProvider>
      <div className="flex flex-1 flex-col min-h-full">
        <main className="flex-1">
          test
        </main>
      </div>
    </ModalProvider>
  );
};

export default Home;
