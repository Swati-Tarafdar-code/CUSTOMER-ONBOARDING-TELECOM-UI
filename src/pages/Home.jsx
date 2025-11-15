// // src/pages/Home.jsx
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const Home = () => {
//   const { role } = useAuth();
//   const navigate = useNavigate();
//   const goto = (r) => navigate(r === 'admin' ? '/admin' : '/customer');

//   return (
//     <div className="home">
//       <h1>Document Portal</h1>
//       {!role && (
//         <>
//           <p>Select your role to continue</p>
//           <div className="role-chooser">
//             <Link to="/login?role=customer" className="btn">Customer Login</Link>
//             <Link to="/login?role=admin" className="btn">Admin Login</Link>
//           </div>
//         </>
//       )}
//       {role && (
//         <div className="role-chooser">
//           <button onClick={() => goto(role)} className="btn">Go to Dashboard</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;

// ...existing code...
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../Home.css';
import HeroImg from '../images/Home.png';

const Home = () => {
  const { role } = useAuth();
  const navigate = useNavigate();
  const goto = (r) => navigate(r === 'admin' ? '/admin' : '/customer');

  return (
    <div className="home-hero">
      <div className="hero-card">
        <div className="hero-left">
          <h1 className="hero-title">AirConnect Customer<br/>Onboarding Portal</h1>
          <p className="hero-sub">
            Streamline your customer verification with ease and confidence. Access your dashboard or register to get started.
          </p>

          {!role ? (
            <div className="hero-actions">
              <Link to="/customer" className="link-secondary">Access Customer Dashboard</Link>
              <Link to="/login?role=admin" className="btn-primary">Go to Admin Dashboard</Link>
            </div>
          ) : (
            <div className="hero-actions">
              <button onClick={() => goto(role)} className="btn-primary">Go to Dashboard</button>
            </div>
          )}

          <div className="hero-register">
            <Link to="/signup">New User? Register Here</Link>
          </div>
        </div>

        <div className="hero-right">
          {/* Put your image at public/images/Home.png */}
          <img src={HeroImg} alt="Onboarding illustration" />
        </div>
      </div>
    </div>
  );
};

export default Home;
// ...existing code...