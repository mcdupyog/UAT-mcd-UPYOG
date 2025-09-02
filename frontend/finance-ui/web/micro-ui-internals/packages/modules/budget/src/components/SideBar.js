import React, { useState, useEffect } from "react";

const Sidebar = ({ menuItems, onMenuItemClick, activeIndex: externalActiveIndex, onToggle }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    setActiveIndex(externalActiveIndex);
  }, [externalActiveIndex]);

  // Notify parent when sidebar state changes
  const handleToggle = () => {
    const newOpenState = !isOpen;
    setIsOpen(newOpenState);
    if (onToggle) {
      onToggle(newOpenState); // Pass the new state to parent
    }
  };

  const styles = {
    sidebar: {
      width: isOpen ? "240px" : "70px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      height: "calc(100vh - 60px)",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      overflow: "hidden",
      position: "fixed",
      top: "127px",
      left: 0,
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
      zIndex: 1000,
    },
    header: {
      background: "rgba(255, 255, 255, 0.1)",
      padding: "20px 16px",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(10px)",
    },
    toggleBtn: {
      background: "rgba(255, 255, 255, 0.2)",
      color: "white",
      border: "none",
      borderRadius: "8px",
      padding: "8px 12px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
      transition: "all 0.2s",
      marginTop: "10px",
      width: "100%",
    },
    toggleBtnHover: {
      background: "rgba(255, 255, 255, 0.3)",
      transform: "translateY(-1px)",
    },
    menuList: {
      listStyle: "none",
      padding: "20px 12px",
      margin: 0,
    },
    menuItem: {
      padding: "14px 16px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      marginBottom: "8px",
      borderRadius: "12px",
      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      background: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(10px)",
    },
    menuItemHover: {
      background: "rgba(255, 255, 255, 0.15)",
      transform: "translateX(4px)",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
    },
    menuItemActive: {
      background: "linear-gradient(135deg, #ff6b6b, #ee5a24)",
      transform: "translateX(4px)",
      boxShadow: "0 6px 20px rgba(255, 107, 107, 0.3)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
    },
    icon: {
      marginRight: isOpen ? "12px" : "0",
      fontSize: "18px",
      minWidth: "20px",
      textAlign: "center",
      transition: "margin-right 0.3s",
    },
    label: {
      fontSize: "14px",
      fontWeight: "500",
      opacity: isOpen ? 1 : 0,
      transition: "opacity 0.3s",
      whiteSpace: "nowrap",
    },
    submenu: {
      paddingLeft: "24px",
      listStyle: "none",
      marginTop: "8px",
      display: isOpen ? "block" : "none",
    },
    submenuItem: {
      padding: "10px 16px",
      fontSize: "13px",
      marginBottom: "4px",
      borderRadius: "8px",
      background: "rgba(255, 255, 255, 0.08)",
      border: "1px solid rgba(255, 255, 255, 0.05)",
      transition: "all 0.2s",
      cursor: "pointer",
    },
    submenuItemHover: {
      background: "rgba(255, 255, 255, 0.12)",
      transform: "translateX(2px)",
    },
    badge: {
      background: "#ff4757",
      color: "white",
      fontSize: "11px",
      padding: "2px 6px",
      borderRadius: "10px",
      marginLeft: "auto",
      fontWeight: "600",
    },
  };

  const handleMenuItemClick = (item, index) => {
    setActiveIndex(index);
    if (onMenuItemClick) {
      onMenuItemClick(item, index);
    }
  };

  return (
    <div style={styles.sidebar}>
      <div style={styles.header}>
        <button
          style={{
            ...styles.toggleBtn,
            ...(hoveredItem === "toggle" ? styles.toggleBtnHover : {}),
          }}
          onClick={handleToggle} // Use the new handler
          onMouseEnter={() => setHoveredItem("toggle")}
          onMouseLeave={() => setHoveredItem(null)}
        >
          {isOpen ? "← Collapse" : "→"}
        </button>
      </div>

      <ul style={styles.menuList}>
        {menuItems.map((item, index) => (
          <li key={index}>
            <div
              style={{
                ...styles.menuItem,
                ...(activeIndex === index ? styles.menuItemActive : {}),
                ...(hoveredItem === index && activeIndex !== index ? styles.menuItemHover : {}),
              }}
              onClick={() => handleMenuItemClick(item, index)}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {item.icon && <span style={styles.icon}>{item.icon}</span>}
              <span style={styles.label}>{item.label}</span>
              {item.badge && isOpen && <span style={styles.badge}>{item.badge}</span>}
            </div>

            {item.submenu && isOpen && (
              <ul style={styles.submenu}>
                {item.submenu.map((sub, i) => (
                  <li
                    key={i}
                    style={{
                      ...styles.submenuItem,
                      ...(hoveredItem === `${index}-${i}` ? styles.submenuItemHover : {}),
                    }}
                    onClick={() => handleMenuItemClick(sub, `${index}-${i}`)}
                    onMouseEnter={() => setHoveredItem(`${index}-${i}`)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {sub.label}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;