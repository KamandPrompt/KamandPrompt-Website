import Item from "./Item";
import { QUICKLINKS, CONTACT } from "../../assets/js/Menus";
import Logo from '../../assets/logo.svg';


const ItemsContainer = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:px-8 px-5 py-16">
      <div className="flex flex-col justify-center items-center w-3/6 h-3/6">
        <img src={Logo}/>
        <h1>Programming Club IIT Mandi</h1>
      </div>
      <Item Links={QUICKLINKS} title="QUICK LINKS" mode="link-list" />
      <Item Links={CONTACT} title="CONTACT US" mode="logo-link-list"/>
    </div>
  );
};

export default ItemsContainer;