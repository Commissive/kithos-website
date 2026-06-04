"use client";

import {
  createContext,
  useCallback,
  useContext,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import "./tabs.css";

type TabsContextValue = {
  ariaLabel?: string;
  baseId: string;
  value: string;
  setValue: (next: string) => void;
  listRef: React.RefObject<HTMLDivElement | null>;
  registerTrigger: (value: string, element: HTMLButtonElement | null) => void;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(component: string) {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error(`${component} must be used within <Tabs>`);
  }

  return context;
}

export function useTabsBaseId() {
  return useTabsContext("useTabsBaseId").baseId;
}

export type TabsProps = {
  children: ReactNode;
  className?: string;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  "aria-label"?: string;
};

export function Tabs({
  children,
  className,
  defaultValue = "",
  value: valueProp,
  onValueChange,
  "aria-label": ariaLabel,
}: TabsProps) {
  const baseId = useId();
  const listRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef(new Map<string, HTMLButtonElement>());
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

  const value = valueProp ?? uncontrolledValue;

  const setValue = useCallback(
    (next: string) => {
      if (valueProp === undefined) {
        setUncontrolledValue(next);
      }
      onValueChange?.(next);
    },
    [onValueChange, valueProp],
  );

  const registerTrigger = useCallback(
    (triggerValue: string, element: HTMLButtonElement | null) => {
      if (element) {
        triggersRef.current.set(triggerValue, element);
        return;
      }

      triggersRef.current.delete(triggerValue);
    },
    [],
  );

  const context = useMemo(
    () => ({
      ariaLabel,
      baseId,
      value,
      setValue,
      listRef,
      registerTrigger,
    }),
    [ariaLabel, baseId, registerTrigger, setValue, value],
  );

  return (
    <TabsContext.Provider value={context}>
      <div className={className ? `tabs ${className}` : "tabs"}>{children}</div>
    </TabsContext.Provider>
  );
}

export type TabsListProps = {
  children: ReactNode;
  className?: string;
  variant?: "segmented" | "underline" | "ruled";
};

export function TabsList({
  children,
  className,
  variant = "segmented",
}: TabsListProps) {
  const { ariaLabel, value, listRef } = useTabsContext("TabsList");
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false });

  const updateIndicator = useCallback(() => {
    const list = listRef.current;
    const active = list?.querySelector<HTMLButtonElement>('[role="tab"][aria-selected="true"]');

    if (!list || !active) {
      setIndicator((current) => ({ ...current, ready: false }));
      return;
    }

    const listRect = list.getBoundingClientRect();
    const tabRect = active.getBoundingClientRect();

    setIndicator({
      left: tabRect.left - listRect.left + list.scrollLeft,
      width: tabRect.width,
      ready: true,
    });
  }, [listRef]);

  useLayoutEffect(() => {
    updateIndicator();
  }, [updateIndicator, value, children]);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;

    window.addEventListener("resize", updateIndicator);

    if (typeof ResizeObserver === "undefined") {
      return () => {
        window.removeEventListener("resize", updateIndicator);
      };
    }

    const observer = new ResizeObserver(updateIndicator);
    observer.observe(list);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateIndicator);
    };
  }, [listRef, updateIndicator]);

  const showIndicator = variant === "segmented" || variant === "underline";

  const listClassName = [
    "tabs__list",
    variant === "underline" ? "tabs__list--underline" : "",
    variant === "ruled" ? "tabs__list--ruled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label={ariaLabel}
      className={listClassName}
    >
      {showIndicator ? (
        <span
          aria-hidden
          className="tabs__indicator"
          style={{
            left: indicator.left,
            width: indicator.width,
            opacity: indicator.ready ? 1 : 0,
          }}
        />
      ) : null}
      {children}
    </div>
  );
}

export type TabsTriggerProps = {
  children: ReactNode;
  className?: string;
  value: string;
};

export function TabsTrigger({ children, className, value: triggerValue }: TabsTriggerProps) {
  const { baseId, value, setValue, registerTrigger } = useTabsContext("TabsTrigger");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const selected = value === triggerValue;
  const tabId = `${baseId}-tab-${triggerValue}`;
  const panelId = `${baseId}-panel-${triggerValue}`;

  useLayoutEffect(() => {
    registerTrigger(triggerValue, triggerRef.current);
    return () => registerTrigger(triggerValue, null);
  }, [registerTrigger, triggerValue]);

  const focusTab = (nextValue: string) => {
    const next = document.getElementById(`${baseId}-tab-${nextValue}`);
    next?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const list = triggerRef.current?.closest('[role="tablist"]');
    const tabs = list
      ? Array.from(list.querySelectorAll<HTMLButtonElement>('[role="tab"]'))
      : [];
    const index = tabs.findIndex((tab) => tab.dataset.value === triggerValue);

    if (index < 0) return;

    let nextIndex: number | null = null;

    switch (event.key) {
      case "ArrowLeft":
        nextIndex = (index - 1 + tabs.length) % tabs.length;
        break;
      case "ArrowRight":
        nextIndex = (index + 1) % tabs.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    const nextValue = tabs[nextIndex]?.dataset.value;
    if (!nextValue) return;

    setValue(nextValue);
    focusTab(nextValue);
  };

  return (
    <button
      ref={triggerRef}
      id={tabId}
      type="button"
      role="tab"
      data-value={triggerValue}
      aria-selected={selected}
      aria-controls={panelId}
      tabIndex={selected ? 0 : -1}
      className={className ? `tabs__trigger ${className}` : "tabs__trigger"}
      onClick={() => setValue(triggerValue)}
      onKeyDown={onKeyDown}
    >
      {children}
    </button>
  );
}

export type TabsPanelProps = {
  children: ReactNode;
  className?: string;
  value: string;
  keepMounted?: boolean;
};

export function TabsPanel({
  children,
  className,
  value: panelValue,
  keepMounted = false,
}: TabsPanelProps) {
  const { baseId, value } = useTabsContext("TabsPanel");
  const selected = value === panelValue;
  const panelId = `${baseId}-panel-${panelValue}`;
  const tabId = `${baseId}-tab-${panelValue}`;

  if (!selected && !keepMounted) {
    return null;
  }

  return (
    <div
      id={panelId}
      role="tabpanel"
      aria-labelledby={tabId}
      hidden={!selected}
      className={className ? `tabs__panel ${className}` : "tabs__panel"}
    >
      {children}
    </div>
  );
}
