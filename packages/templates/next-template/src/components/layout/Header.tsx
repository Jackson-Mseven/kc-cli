import CustomImage from "../base/CustomImage";
import Logo from "public/static/images/basic/logo-with-text.webp";
import CustomLink from "../base/CustomLink";

const Header = () => {
  return (
    <header className="h-header border-b">
      <div className="container">
        <CustomLink href="/">
          <CustomImage src={Logo} alt="logo" height={50} />
        </CustomLink>
      </div>
    </header>
  );
};

export default Header;
