import AdminLoginLogo from '../assets/Images/adminloginlogo.png'

const AdminLoginPage = () => {
	return (
    <div className="bg-primary1-pink w-screen h-screen">
      <section className="container">
        <div className="pt-[50px]">
          <div className="flex flex-col justify-center items-center gap-8 ">
            <div>
              <img src={AdminLoginLogo} alt="Admin Login" />
            </div>
            <div className="w-[500px] h-[660px] bg-white rounded-[24px] p-10">
              <div>
                <h1>Account Login</h1>
                <p>
                  If you are already a member you can login with your email
                  address and password.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default AdminLoginPage