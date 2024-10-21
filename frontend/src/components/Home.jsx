
import bg from '../assets/background.jpg'

// eslint-disable-next-line react/prop-types
function Home() {
  const username = localStorage.getItem('username');
  // console.log("Username",username);
  return (
    <h1 className='h-screen flex w-full justify-center items-center text-5xl' style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      {username ? `Welcome ${username}` : "Welcome, Login to proceed"}
    </h1>
  );
}

export default Home;
