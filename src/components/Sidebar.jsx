import { useContext, useState } from "react";
import "./Sidebar.css";
import { Menu } from "@mui/icons-material";
import { Add } from "@mui/icons-material";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import HistoryIcon from "@mui/icons-material/History";
import SettingsIcon from "@mui/icons-material/Settings";
import { Context } from "../context/Context";

function Sidebar() {
  const [Extended, setExtended] = useState(false);
  const { onSent, prevPrompts, setrecentPrompts } = useContext(Context);
  const loadPrompt = async (prompt) => {
    setrecentPrompts(prompt);
    await onSent(prompt);
  };
  return (
    <div className="Sidebar">
      <div className="top">
        <Menu
          className="img menu"
          onClick={() => setExtended((prev) => !prev)}
        />
        <div className="new-chat">
          <Add className="img" />
          {Extended ? <p>New Chat</p> : null}
        </div>
        {Extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => {
              return (
                <>
                  <div
                    onClick={() => loadPrompt(item)}
                    className="recent-entry"
                  >
                    <MessageOutlinedIcon className="img" />
                    <p>{item.slice(0, 18)} ...</p>
                  </div>
                </>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <HelpOutlineOutlinedIcon className="img" />
          {Extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <HistoryIcon className="img" />
          {Extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <SettingsIcon className="img" />
          {Extended ? <p>Setting</p> : null}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
