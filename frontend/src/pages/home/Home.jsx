import Hero from "../../components/hero/Hero";

const Home = () => {
  return (
    <div >
      <Hero />
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLScT3WtfRbrUykC2A6oB5wiA9YUx89-_3qfHDnZLLVUBDrW8AA/viewform?usp=dialog"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
        title="Research Form"
        style={{ borderBottom: "1px solid green", fontSize:"2rem" }}
      >
            Fill out the form
      </a>

    </div>
  );
};

export default Home;