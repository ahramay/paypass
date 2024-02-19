import {
    HiOutlineColorSwatch,
    HiOutlineDesktopComputer,
    HiOutlineTemplate,
    HiOutlineViewGridAdd,
    HiOutlineHome,
    HiDocumentText ,
} from 'react-icons/hi'
import { AiFillContainer,AiOutlineContainer ,AiOutlineCopy  } from "react-icons/ai";
import { BiDetail } from "react-icons/bi";
import { FaRegFileAlt,FaFileSignature  } from "react-icons/fa";
import { MdAccountBox,MdOutlineSettings ,MdManageAccounts ,MdOutlineAnalytics  } from "react-icons/md";



export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <HiOutlineHome />,
    // Merchant Icon
    singleMenu: <HiOutlineViewGridAdd />,
    collapseMenu: <HiOutlineTemplate />,
    groupSingleMenu: <HiOutlineDesktopComputer />,
    groupCollapseMenu: <HiOutlineColorSwatch />,
    addVoucher: <AiOutlineContainer />,
    voucherList: <AiOutlineCopy />,
    invoices: <BiDetail />,
    reports: <FaRegFileAlt />,
    account: <MdAccountBox />,
    setting: <MdOutlineSettings />,

     // Admin Icon
    merchantDetail: <MdManageAccounts />,
    merchantVoucher: <AiOutlineCopy />,
    monitoringAndLogging: <FaFileSignature />,
    analytic: <MdOutlineAnalytics />,

   
}

export default navigationIcon
