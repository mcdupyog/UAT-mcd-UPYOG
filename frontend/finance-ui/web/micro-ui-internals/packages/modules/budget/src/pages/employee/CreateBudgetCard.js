import React, { useState, useMemo, useEffect } from "react";
import Sidebar from "../../components/SideBar";
import CreateBudgetGroup from "./CreateBudgetGroup";
import CreateBudgetDefinition from "./CreateBudgetDefinition";
import SearchBudget from "./SearchBudget";

const CreateBudgetCard = () => {
  const contextPath = window?.contextPath || ""; // dynamic context path
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true); // Track sidebar state
  const { isLoading, data } = Digit.Hooks.useAccessControl();

  // Define component mapping based on displayName patterns from API response
  const getComponentFromDisplayName = (displayName, navigationURL) => {
    const name = displayName.toLowerCase();
    const url = navigationURL.toLowerCase();

    if (name.includes("budget group") && name.includes("create")) {
      return {
        component: "CreateBudgetGroup",
        link: `/finance-ui/employee/budget/create-budget-group`,
        icon: "📊",
      };
    } else if (name.includes("budget definition") && name.includes("create")) {
      return {
        component: "CreateBudgetDefinition",
        link: `${contextPath}/create-budget-definition`,
        icon: "👤",
      };
    } else if (name.includes("search budget") || (name.includes("budget") && url.includes("search"))) {
      return {
        component: "SearchBudget",
        link: `${contextPath}/search-budget`,
        icon: "💰",
      };
    }
    return null;
  };

  // Filter menu items based on user access permissions and use API displayName
  const filteredMenu = useMemo(() => {
    if (isLoading || !data?.actions) {
      return []; // Return empty array while loading or if no data
    }

    // Create menu items directly from API response
    const menuItems = [];

    data.actions.forEach((action) => {
      // Get component info based on displayName and navigationURL
      const componentInfo = getComponentFromDisplayName(action.displayName, action.navigationURL || "");

      if (componentInfo) {
        // Check if this component already exists (to avoid duplicates)
        const existingItem = menuItems.find((item) => item.component === componentInfo.component);
        if (!existingItem) {
          menuItems.push({
            label: action.displayName, // Use displayName from API
            icon: componentInfo.icon,
            link: componentInfo.link,
            component: componentInfo.component,
            actionId: action.id,
            path: action.path,
          });
        }
      }
    });

    return menuItems;
  }, [isLoading, data, contextPath]);

  // Auto-activate first menu item when filteredMenu is populated
  useEffect(() => {
    if (filteredMenu.length > 0 && selectedComponent === null) {
      setSelectedComponent(filteredMenu[0].component);
      setActiveIndex(0);
    }
  }, [filteredMenu, selectedComponent]);

  const handleMenuItemClick = (item, index) => {
    setSelectedComponent(item.component);
    setActiveIndex(index);
  };

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case "CreateBudgetGroup":
        return <CreateBudgetGroup />;
      case "CreateBudgetDefinition":
        return <CreateBudgetDefinition />;
      case "SearchBudget":
        return <SearchBudget />;
      default:
        return (
          <div style={{ padding: "20px" }}>
            <p>Please select an option from the sidebar.</p>
          </div>
        );
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div style={{ padding: "20px" }}>
        <p>Loading permissions...</p>
      </div>
    );
  }

  return (
    <React.Fragment>
      <Sidebar
        menuItems={filteredMenu}
        onMenuItemClick={handleMenuItemClick}
        activeIndex={activeIndex}
        onToggle={setSidebarOpen} // Pass callback to track sidebar state
      />
      <div
        style={{
          marginLeft: sidebarOpen ? "240px" : "70px", // Dynamic margin based on sidebar state
          transition: "margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)", // Smooth transition
          padding: "20px", // Add some padding for better spacing
        }}
      >
        {filteredMenu.length === 0 ? (
          <div style={{ padding: "20px" }}>
            <p>No accessible menu items found.</p>
          </div>
        ) : (
          renderSelectedComponent()
        )}
      </div>
    </React.Fragment>
  );
};

export default CreateBudgetCard;