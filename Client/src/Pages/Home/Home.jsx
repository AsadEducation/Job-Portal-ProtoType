import Banner from "./Banner";
import FeaturedJobs from "./FeaturedJobs";


const Home = () => {
    return (
       <>
          <Banner/>
          <div className="mt-12"><FeaturedJobs/></div>
       </>
    );
};

export default Home;