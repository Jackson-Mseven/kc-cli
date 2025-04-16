import logo from '../../../public/logo.webp';

const MenuLogo = () => {
  return (
    <div
      style={{
        padding: '0 16px',
        marginBottom: '10px',
      }}
    >
      <img src={logo} alt="logo" width={100} />
    </div>
  );
};

export default MenuLogo;
