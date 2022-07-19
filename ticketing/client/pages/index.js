import buildClient from "../api/build-clinet";
const LandingPage = ({ currentUser }) => {
    return currentUser ? <h1>You are signed in</h1> : <h1>Your are not signed in</h1>
    // axios.get('/api/users/currentuser').catch((err) => {
    //   console.log(err.message);
    // });
   
    // return <h1>Landing Page</h1>;
  };

LandingPage.getInitialProps = async (context) => {
    const client = buildClient(context)
    const { data } = await client.get('api/users/currentuser')
    return data
}

export default LandingPage