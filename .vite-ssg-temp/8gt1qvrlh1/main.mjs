import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { createRoot } from "react-dom/client";
import * as React from "react";
import React__default, { useState, useRef, useEffect } from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva } from "class-variance-authority";
import { X, ChevronRight, Check, Circle, Building2, ChevronDown, BookOpen, Phone, Menu, TrendingUp, ArrowRight, ChevronUp, Search, Bed, Square, Calendar, Shield, Users, Star, Mail, MapPin, Heart, Target, Globe, ArrowLeft, Camera, Share2, Bath, Car, MessageSquare, Wifi, Dumbbell, Droplets, Wind, TreePine, Package, Clock, Sparkles, FileCheck, Percent, Award, MessageCircle, CheckCircle2, DollarSign, Home, Settings, Cookie, Lock, UserCheck, RefreshCw } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useTheme } from "next-themes";
import { Toaster as Toaster$2, toast as toast$1 } from "sonner";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useNavigate, useLocation, Link, useParams, Routes, Route, BrowserRouter } from "react-router-dom";
import { Slot } from "@radix-ui/react-slot";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { Helmet, HelmetProvider } from "react-helmet-async";
import useEmblaCarousel from "embla-carousel-react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { HiOutlineLocationMarker, HiOutlinePhone, HiOutlineMail } from "react-icons/hi";
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1e6;
let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}
const toastTimeouts = /* @__PURE__ */ new Map();
const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId
    });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) => t.id === action.toast.id ? { ...t, ...action.toast } : t)
      };
    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast2) => {
          addToRemoveQueue(toast2.id);
        });
      }
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === toastId || toastId === void 0 ? {
            ...t,
            open: false
          } : t
        )
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === void 0) {
        return {
          ...state,
          toasts: []
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId)
      };
  }
};
const listeners = [];
let memoryState = { toasts: [] };
function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}
function toast({ ...props }) {
  const id = genId();
  const update = (props2) => dispatch({
    type: "UPDATE_TOAST",
    toast: { ...props2, id }
  });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      }
    }
  });
  return {
    id,
    dismiss,
    update
  };
}
function useToast() {
  const [state, setState] = React.useState(memoryState);
  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);
  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId })
  };
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const ToastProvider = ToastPrimitives.Provider;
const ToastViewport = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Viewport,
  {
    ref,
    className: cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    ),
    ...props
  }
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Toast = React.forwardRef(({ className, variant, ...props }, ref) => {
  return /* @__PURE__ */ jsx(ToastPrimitives.Root, { ref, className: cn(toastVariants({ variant }), className), ...props });
});
Toast.displayName = ToastPrimitives.Root.displayName;
const ToastAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Action,
  {
    ref,
    className: cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors group-[.destructive]:border-muted/40 hover:bg-secondary group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 group-[.destructive]:focus:ring-destructive disabled:pointer-events-none disabled:opacity-50",
      className
    ),
    ...props
  }
));
ToastAction.displayName = ToastPrimitives.Action.displayName;
const ToastClose = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Close,
  {
    ref,
    className: cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity group-hover:opacity-100 group-[.destructive]:text-red-300 hover:text-foreground group-[.destructive]:hover:text-red-50 focus:opacity-100 focus:outline-none focus:ring-2 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    ),
    "toast-close": "",
    ...props,
    children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
  }
));
ToastClose.displayName = ToastPrimitives.Close.displayName;
const ToastTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ToastPrimitives.Title, { ref, className: cn("text-sm font-semibold", className), ...props }));
ToastTitle.displayName = ToastPrimitives.Title.displayName;
const ToastDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ToastPrimitives.Description, { ref, className: cn("text-sm opacity-90", className), ...props }));
ToastDescription.displayName = ToastPrimitives.Description.displayName;
function Toaster$1() {
  const { toasts } = useToast();
  return /* @__PURE__ */ jsxs(ToastProvider, { children: [
    toasts.map(function({ id, title, description, action, ...props }) {
      return /* @__PURE__ */ jsxs(Toast, { ...props, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1", children: [
          title && /* @__PURE__ */ jsx(ToastTitle, { children: title }),
          description && /* @__PURE__ */ jsx(ToastDescription, { children: description })
        ] }),
        action,
        /* @__PURE__ */ jsx(ToastClose, {})
      ] }, id);
    }),
    /* @__PURE__ */ jsx(ToastViewport, {})
  ] });
}
const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();
  return /* @__PURE__ */ jsx(
    Toaster$2,
    {
      theme,
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const TooltipProvider = TooltipPrimitive.Provider;
const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(
  TooltipPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[state=open]:bg-accent focus:bg-accent",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto h-4 w-4" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Separator, { ref, className: cn("-mx-1 my-1 h-px bg-muted", className), ...props }));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        element == null ? void 0 : element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const element = document.getElementById(id);
      element == null ? void 0 : element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return /* @__PURE__ */ jsxs("header", { className: "sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", children: [
    /* @__PURE__ */ jsxs("nav", { className: "container mx-auto flex h-16 items-center justify-between px-6 md:px-12 lg:px-16 xl:px-24", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", className: "flex items-center gap-3", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: new URL("@/assets/logo.png", import.meta.url).href,
          alt: "Sky Elite Real Estate",
          className: "h-10 w-auto"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "hidden md:flex items-center gap-6", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => scrollToSection("home"),
            className: "text-sm font-medium text-foreground hover:text-primary transition-colors",
            children: "Home"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/about",
            className: "text-sm font-medium text-foreground hover:text-primary transition-colors",
            children: "About Us"
          }
        ),
        /* @__PURE__ */ jsxs(DropdownMenu, { children: [
          /* @__PURE__ */ jsxs(DropdownMenuTrigger, { className: "flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors", children: [
            /* @__PURE__ */ jsx(Building2, { className: "h-4 w-4" }),
            "Properties",
            /* @__PURE__ */ jsx(ChevronDown, { className: "h-3 w-3" })
          ] }),
          /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "start", className: "w-48", children: [
            /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/off-plan", className: "cursor-pointer", children: "Off-Plan" }) }),
            /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/secondary", className: "cursor-pointer", children: "Secondary" }) }),
            /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/rental", className: "cursor-pointer", children: "Rental" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(DropdownMenu, { children: [
          /* @__PURE__ */ jsxs(DropdownMenuTrigger, { className: "flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors", children: [
            /* @__PURE__ */ jsx(BookOpen, { className: "h-4 w-4" }),
            "Resources",
            /* @__PURE__ */ jsx(ChevronDown, { className: "h-3 w-3" })
          ] }),
          /* @__PURE__ */ jsx(DropdownMenuContent, { align: "start", className: "w-48", children: /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/blog", className: "cursor-pointer", children: "Blog" }) }) })
        ] }),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/testimonials",
            className: "text-sm font-medium text-foreground hover:text-primary transition-colors",
            children: "Contact Us"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(Button, { className: "gap-2 hidden md:flex", children: [
        /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "+971 58 827 3634" })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "md:hidden p-2 rounded-md text-foreground hover:text-primary transition-colors",
          onClick: () => setMobileMenuOpen(!mobileMenuOpen),
          children: mobileMenuOpen ? /* @__PURE__ */ jsx(X, { className: "h-6 w-6" }) : /* @__PURE__ */ jsx(Menu, { className: "h-6 w-6" })
        }
      )
    ] }),
    mobileMenuOpen && /* @__PURE__ */ jsx("div", { className: "md:hidden bg-background border-t border-border/40 w-full shadow-md", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col px-6 py-4 gap-3", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            scrollToSection("home");
            setMobileMenuOpen(false);
          },
          className: "text-sm font-medium text-foreground hover:text-primary transition-colors text-left",
          children: "Home"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/about",
          onClick: () => setMobileMenuOpen(false),
          className: "text-sm font-medium text-foreground hover:text-primary transition-colors",
          children: "About Us"
        }
      ),
      /* @__PURE__ */ jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsxs(DropdownMenuTrigger, { className: "flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors w-full justify-between", children: [
          /* @__PURE__ */ jsx("span", { children: "Properties" }),
          /* @__PURE__ */ jsx(ChevronDown, { className: "h-3 w-3" })
        ] }),
        /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "start", className: "w-full", children: [
          /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsx(
            Link,
            {
              to: "/off-plan",
              onClick: () => setMobileMenuOpen(false),
              className: "cursor-pointer",
              children: "Off-Plan"
            }
          ) }),
          /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsx(
            Link,
            {
              to: "/secondary",
              onClick: () => setMobileMenuOpen(false),
              className: "cursor-pointer",
              children: "Secondary"
            }
          ) }),
          /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsx(
            Link,
            {
              to: "/rental",
              onClick: () => setMobileMenuOpen(false),
              className: "cursor-pointer",
              children: "Rental"
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsxs(DropdownMenuTrigger, { className: "flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors w-full justify-between", children: [
          /* @__PURE__ */ jsx("span", { children: "Resources" }),
          /* @__PURE__ */ jsx(ChevronDown, { className: "h-3 w-3" })
        ] }),
        /* @__PURE__ */ jsx(DropdownMenuContent, { align: "start", className: "w-full", children: /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsx(
          Link,
          {
            to: "/blog",
            onClick: () => setMobileMenuOpen(false),
            className: "cursor-pointer",
            children: "Blog"
          }
        ) }) })
      ] }),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/testimonials",
          onClick: () => setMobileMenuOpen(false),
          className: "text-sm font-medium text-foreground hover:text-primary transition-colors",
          children: "Contact Us"
        }
      ),
      /* @__PURE__ */ jsxs(Button, { className: "gap-2 mt-2 w-full", children: [
        /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4" }),
        "+971 58 827 3634"
      ] })
    ] }) })
  ] });
};
const heroProperty1 = "/assets/hero-property-1-DFmb90Nm.jpg";
const heroProperty2 = "/assets/hero-property-2-Be8Skq28.jpg";
const heroProperty3 = "/assets/hero-property-3-C1FtWVVw.jpg";
const heroProperty4 = "/assets/hero-property-4-BbtDRcGl.jpg";
const emaarLogo = "data:image/png;base64,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";
const nakheelLogo$1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI0AAAB0CAMAAACPHUFGAAAAllBMVEUAAAAdHRsRERAXFxUcHBsdHRscHBodHRsdHRscHBoZGRccHBodHRsdHRsdHRsdHRsdHRsdHRsdHRsdHRsdHRscHBsWFhQdHRsdHRsdHRscHBodHRsdHRsdHRsdHRsdHRscHBsdHRsdHRsdHRsdHRsdHRsdHRsdHRsdHRsdHRsdHRscHBodHRsdHRsdHRsdHRsdHRsdHRvQtYEoAAAAMXRSTlMAegwRL/olGdUhBBXyxnTlzr58bk46CPawgkeokIxnYjXspJiJ6NqtlFwpHeC4VEGcLFnXVAAAAvRJREFUeNrt1WliqyAQAOBx35KoiZqlWczSrE1fuf/lHiADmNSeYL4/TQGRYQYEQgghhBBCCCGEEEIIIYQQQgiAa0vhVYpdoNljhxsbr9PAq8a19LvdEbONxqcQLNlYdZwBtaplY8/ywaR5hi3/PtWwD7Akk0scMNsMbDv2KpiC5sUMedh2wIV75iW45oNe8pwpX6D5z/eXZWD7niqnkqEtKFHMtAp3S8d2BGW1x6YQZ1U7Ltb0wAcvOKo4OhPOkTs3pMakxakKOWcsxzmW0Jm9xWVaxrg8/H9mwrjH2FhDp+L/tDBo2w/Rz/nCEkxlCR0+Ka76JJPJSwb35qbmCVTJpK2urxDraAJoISYdVjMlkYvhLz1nEKm2uQl7aRVocubRlqqSGgwK158GasNcrCwHhnlRZJVRhZnCvMURAGBQKxBKkchCt1R8W9Ztr5BwrQeRbz4yEH83qvEJfzjLKdDFOrsrHlXhqvebvDzEXquD+AkgCnEHa8ZhvZ5YZwHClf+qATwsfR+Gfff6MzyVd4CK/x57IGzsEl3K4nX3ctHugR9gH5q99f6rGv3T6MROTKEX8Idxr39iotqJJx+RhM0BcDlPjHpnEBZ8UGaeq6zLqEw6bTdfqQ/msNC+W8DNmZQncjHv6q6y7uK4zvm4L8auqUy3lAO4C/aLoNG1d4NBIt9z1xw49WyLqdfM2SzwTvmRx6yS3wAddzpmA2EE+jswKP20tu6Oi7nBVOy0bxSscwFfFi1eBnltfylGnof5uIbGRoYR42nNYMiNd68dZ+I4y4+zGp77cHi9sI/YB0d9p0DBnqLIzXH50d+0NVhWsnCW+qt8cSq/K0gPevBpY37N5LsXKSD75g/54ZnicVyrZZ2wJGJ9P9gyGYZXMOOtojHfttFzloFbiuDS369o3hdEr+neq6fVGcDlal/ybndnb7E/+qtxLLOqlvXcit/Q1zjGDl5ETt/2rR54YyIrc7XtDySEEEIIIYQQQgghhBBCCCGEwH8Bis/zZXKd9AAAAABJRU5ErkJggg==";
const nakheelLogo = "/assets/Logo-10-CnJngFJ-.png";
const visualShowcase = [
  {
    image: heroProperty1,
    title: "Waterfront Luxury",
    subtitle: "Premium Properties"
  },
  {
    image: heroProperty2,
    title: "Urban Excellence",
    subtitle: "Dubai Marina"
  },
  {
    image: heroProperty3,
    title: "Sky-High Living",
    subtitle: "Penthouse Collection"
  },
  {
    image: heroProperty4,
    title: "Iconic Locations",
    subtitle: "Palm Jumeirah"
  }
];
const highlights = [
  "Tax-Efficient Structures",
  "Long-Term Partnership",
  "Performance-Driven Selection",
  "Regulatory Compliance"
];
const Hero = () => {
  const scrollToProperties = () => {
    const element = document.getElementById("properties");
    element == null ? void 0 : element.scrollIntoView({ behavior: "smooth" });
  };
  const trackRef = useRef(null);
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let position = 0;
    const speed = 0.4;
    const logos2 = track.children.length;
    const logoWidth = 180;
    const totalWidth = logos2 * logoWidth;
    const animate = () => {
      position -= speed;
      if (Math.abs(position) >= totalWidth / 2) {
        position = 0;
      }
      track.style.transform = `translateX(${position}px)`;
      requestAnimationFrame(animate);
    };
    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);
  return /* @__PURE__ */ jsxs("section", { id: "home", className: "relative overflow-hidden bg-gradient-to-b from-background via-muted/20 to-background pt-20 pb-16 md:pt-32 md:pb-24", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 -z-10 opacity-5", children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0", style: {
      backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
      backgroundSize: "40px 40px"
    } }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl animate-pulse" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 -z-10 h-96 w-96 rounded-full bg-accent/10 blur-3xl animate-pulse", style: { animationDelay: "1s" } }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 md:px-12 lg:px-16 xl:px-24", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid gap-12 lg:grid-cols-2 lg:gap-16 items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center lg:text-left animate-fade-in", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary", children: [
            /* @__PURE__ */ jsx(TrendingUp, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsx("span", { children: "Structured Real Estate Investment" })
          ] }),
          /* @__PURE__ */ jsxs("h1", { className: "mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl", children: [
            "Invest with",
            " ",
            /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]", children: "Foresight" }),
            ", Built on Structure"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mb-6 text-lg text-muted-foreground md:text-xl", children: "Transform your wealth through Dubai's most promising real estate opportunities" }),
          /* @__PURE__ */ jsx("div", { className: "mb-8 grid grid-cols-2 gap-3", children: highlights.map((highlight, index) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "flex items-center gap-2 rounded-lg bg-card p-3 shadow-sm transition-all hover:shadow-md",
              style: { animationDelay: `${index * 100}ms` },
              children: [
                /* @__PURE__ */ jsx("div", { className: "flex h-2 w-2 rounded-full bg-primary" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-foreground", children: highlight })
              ]
            },
            index
          )) }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start", children: [
            /* @__PURE__ */ jsxs(Button, { size: "lg", onClick: scrollToProperties, className: "gap-2 text-base shadow-lg hover:shadow-xl transition-all", children: [
              "Explore Opportunities",
              /* @__PURE__ */ jsx(ArrowRight, { className: "h-5 w-5" })
            ] }),
            /* @__PURE__ */ jsx(Button, { size: "lg", variant: "outline", className: "text-base border-2", children: "Schedule Consultation" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4 animate-fade-in", style: { animationDelay: "200ms" }, children: visualShowcase.map((visual, index) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 aspect-[4/3]",
            style: { animationDelay: `${(index + 2) * 100}ms` },
            children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: visual.image,
                  alt: visual.title,
                  className: "absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" }),
              /* @__PURE__ */ jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-4 text-white", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold mb-1", children: visual.title }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-white/90", children: visual.subtitle })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "absolute top-3 right-3 bg-primary/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity", children: "View More" })
            ]
          },
          index
        )) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-16 border-t border-border pt-8 opacity-70", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center gap-6", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Trusted Partners:" }),
        /* @__PURE__ */ jsx("div", { className: "relative overflow-hidden w-[300px] sm:w-[360px] md:w-[420px] lg:w-[450px]", children: /* @__PURE__ */ jsxs(
          "div",
          {
            ref: trackRef,
            className: "flex gap-6 items-center w-max",
            children: [
              [emaarLogo, nakheelLogo$1, nakheelLogo].map((logo2, index) => /* @__PURE__ */ jsx(
                "img",
                {
                  src: logo2,
                  alt: "Partner Logo",
                  className: "h-[70px] sm:h-[80px] md:h-[90px] object-contain flex-shrink-0 opacity-70 hover:opacity-100 transition"
                },
                `logo-${index}`
              )),
              [emaarLogo, nakheelLogo$1, nakheelLogo].map((logo2, index) => /* @__PURE__ */ jsx(
                "img",
                {
                  src: logo2,
                  alt: "Partner Logo",
                  className: "h-[70px] sm:h-[80px] md:h-[90px] object-contain flex-shrink-0 opacity-70 hover:opacity-100 transition"
                },
                `logo-duplicate-${index}`
              ))
            ]
          }
        ) })
      ] }) })
    ] })
  ] });
};
const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsx(
        SelectPrimitive.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Label, { ref, className: cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className), ...props }));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Separator, { ref, className: cn("-mx-1 my-1 h-px bg-muted", className), ...props }));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
const PropertyFilters = () => {
  return /* @__PURE__ */ jsx("section", { className: "border-y border-border bg-card py-8", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 md:px-12 lg:px-16 xl:px-24", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-5", children: [
    /* @__PURE__ */ jsxs(Select, { children: [
      /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Location" }) }),
      /* @__PURE__ */ jsxs(SelectContent, { children: [
        /* @__PURE__ */ jsx(SelectItem, { value: "dubai", children: "Dubai" }),
        /* @__PURE__ */ jsx(SelectItem, { value: "al-haseen", children: "Al Haseen" }),
        /* @__PURE__ */ jsx(SelectItem, { value: "dugasta", children: "Dugasta" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Select, { children: [
      /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Property Type" }) }),
      /* @__PURE__ */ jsxs(SelectContent, { children: [
        /* @__PURE__ */ jsx(SelectItem, { value: "apartment", children: "Apartment" }),
        /* @__PURE__ */ jsx(SelectItem, { value: "villa", children: "Villa" }),
        /* @__PURE__ */ jsx(SelectItem, { value: "studio", children: "Studio" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Select, { children: [
      /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Price Range" }) }),
      /* @__PURE__ */ jsxs(SelectContent, { children: [
        /* @__PURE__ */ jsx(SelectItem, { value: "0-500k", children: "Under AED 500k" }),
        /* @__PURE__ */ jsx(SelectItem, { value: "500k-1m", children: "AED 500k - 1M" }),
        /* @__PURE__ */ jsx(SelectItem, { value: "1m-5m", children: "AED 1M - 5M" }),
        /* @__PURE__ */ jsx(SelectItem, { value: "5m+", children: "Above AED 5M" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Select, { children: [
      /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Bedrooms" }) }),
      /* @__PURE__ */ jsxs(SelectContent, { children: [
        /* @__PURE__ */ jsx(SelectItem, { value: "studio", children: "Studio" }),
        /* @__PURE__ */ jsx(SelectItem, { value: "1", children: "1 Bedroom" }),
        /* @__PURE__ */ jsx(SelectItem, { value: "2", children: "2 Bedrooms" }),
        /* @__PURE__ */ jsx(SelectItem, { value: "3+", children: "3+ Bedrooms" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Button, { className: "gap-2", children: [
      /* @__PURE__ */ jsx(Search, { className: "h-4 w-4" }),
      "Search"
    ] })
  ] }) }) });
};
const Card = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("rounded-lg border bg-card text-card-foreground shadow-sm", className), ...props }));
Card.displayName = "Card";
const CardHeader = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("flex flex-col space-y-1.5 p-6", className), ...props })
);
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("h3", { ref, className: cn("text-2xl font-semibold leading-none tracking-tight", className), ...props })
);
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("p", { ref, className: cn("text-sm text-muted-foreground", className), ...props })
);
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props })
);
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("flex items-center p-6 pt-0", className), ...props })
);
CardFooter.displayName = "CardFooter";
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
const PropertyCard = ({
  id,
  title,
  location,
  price,
  type,
  bedrooms,
  area,
  addedDate,
  image,
  featured,
  roi
}) => {
  return /* @__PURE__ */ jsx(Link, { to: `/property/${id}`, children: /* @__PURE__ */ jsxs(Card, { className: "group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer", children: [
    /* @__PURE__ */ jsx(CardHeader, { className: "relative p-0", children: /* @__PURE__ */ jsxs("div", { className: "relative aspect-[4/3] overflow-hidden", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: image,
          alt: title,
          className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "absolute top-4 left-4 flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsx(Badge, { className: "bg-primary text-primary-foreground font-semibold shadow-lg", children: type }),
        featured && /* @__PURE__ */ jsx(Badge, { className: "bg-secondary text-secondary-foreground font-semibold shadow-lg", children: "Featured" }),
        roi && /* @__PURE__ */ jsxs(Badge, { className: "bg-accent text-accent-foreground font-semibold shadow-lg", children: [
          "ROI ",
          roi
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs(CardContent, { className: "p-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "mb-2 text-xl font-bold text-foreground line-clamp-1", children: title }),
      /* @__PURE__ */ jsx("p", { className: "mb-4 text-sm text-muted-foreground", children: location }),
      /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-primary", children: price }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4 text-sm text-muted-foreground", children: [
        bedrooms && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(Bed, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxs("span", { children: [
            bedrooms,
            " Bed",
            bedrooms > 1 ? "s" : ""
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(Square, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { children: area })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(CardFooter, { className: "border-t border-border px-6 py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsx(Calendar, { className: "h-3 w-3" }),
      /* @__PURE__ */ jsxs("span", { children: [
        "Added: ",
        addedDate
      ] })
    ] }) })
  ] }) });
};
const Tabs = TabsPrimitive.Root;
const TabsList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.List,
  {
    ref,
    className: cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = TabsPrimitive.List.displayName;
const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
const TabsContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
const properties = {
  all: [
    {
      id: "1",
      title: "Stylish Studio in Al Haseen 4",
      location: "Dugasta, Dubai",
      price: "AED 379,000",
      type: "For Sale",
      area: "379 sq.ft",
      addedDate: "06 Nov 2025",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80"
    },
    {
      id: "2",
      title: "1 BHK in Dugasta Al Haseen 4",
      location: "Al Haseen-4, Dubai",
      price: "AED 552,204",
      type: "Off-Plan",
      bedrooms: 1,
      area: "550 sq.ft",
      addedDate: "03 Sep 2025",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80"
    },
    {
      id: "3",
      title: "Annual Returns 10%",
      location: "Al Haseen-4, Dubai",
      price: "AED 1,427,989",
      type: "Ready Investment",
      bedrooms: 1,
      area: "650 sq.ft",
      addedDate: "03 Sep 2025",
      roi: "10%",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      featured: true
    },
    {
      id: "4",
      title: "Luxury Villas Handing Over In 2029",
      location: "Selvara, Grand Polo Club & Resort, Dubai",
      price: "AED 6,286,888",
      type: "Off-Plan",
      bedrooms: 4,
      area: "3500 sq.ft",
      addedDate: "30 Jul 2025",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
      featured: true
    }
  ]
};
const PropertiesSection = () => {
  return /* @__PURE__ */ jsx("section", { id: "properties", className: "py-16 md:py-24 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 md:px-12 lg:px-16 xl:px-24", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-12 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl font-bold text-foreground md:text-4xl", children: "Featured Properties" }),
      /* @__PURE__ */ jsx("p", { className: "mx-auto max-w-2xl text-muted-foreground", children: "Discover premium Dubai properties with guaranteed returns and long-term value" })
    ] }),
    /* @__PURE__ */ jsxs(Tabs, { defaultValue: "all", className: "w-full", children: [
      /* @__PURE__ */ jsxs(TabsList, { className: "mb-8 grid w-full max-w-md mx-auto grid-cols-4", children: [
        /* @__PURE__ */ jsx(TabsTrigger, { value: "all", children: "All" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "sale", children: "For Sale" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "offplan", children: "Off-Plan" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "investment", children: "Investment" })
      ] }),
      /* @__PURE__ */ jsx(TabsContent, { value: "all", className: "mt-6", children: /* @__PURE__ */ jsx("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: properties.all.map((property) => /* @__PURE__ */ jsx(PropertyCard, { ...property }, property.id)) }) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "sale", children: /* @__PURE__ */ jsx("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: properties.all.filter((p) => p.type === "For Sale").map((property) => /* @__PURE__ */ jsx(PropertyCard, { ...property }, property.id)) }) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "offplan", children: /* @__PURE__ */ jsx("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: properties.all.filter((p) => p.type === "Off-Plan").map((property) => /* @__PURE__ */ jsx(PropertyCard, { ...property }, property.id)) }) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "investment", children: /* @__PURE__ */ jsx("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: properties.all.filter((p) => p.type === "Ready Investment").map((property) => /* @__PURE__ */ jsx(PropertyCard, { ...property }, property.id)) }) })
    ] })
  ] }) });
};
const InvestmentBanner = () => {
  return /* @__PURE__ */ jsx("section", { className: "bg-gradient-to-r from-primary to-accent py-16 md:py-20 text-white", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 md:px-12 lg:px-16 xl:px-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-4xl text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-6 flex justify-center", children: /* @__PURE__ */ jsx(TrendingUp, { className: "h-16 w-16" }) }),
    /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl font-bold md:text-4xl lg:text-5xl", children: "Invest Once. Earn 10% Net ROI for 10 Years" }),
    /* @__PURE__ */ jsx("p", { className: "mb-8 text-lg md:text-xl opacity-90", children: "Al Haseen Residences - the new standard of structured investing" }),
    /* @__PURE__ */ jsx(Button, { size: "lg", variant: "secondary", className: "text-base", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/al-haseen-residences", children: "Explore The Investment Details" }) })
  ] }) }) });
};
const features$1 = [
  {
    icon: Building2,
    title: "Premium Properties",
    description: "Exclusive access to Dubai's most sought-after real estate developments"
  },
  {
    icon: Shield,
    title: "RERA-Backed",
    description: "All properties verified and regulated by Dubai's Real Estate Regulatory Agency"
  },
  {
    icon: TrendingUp,
    title: "Guaranteed Returns",
    description: "Structured investments with guaranteed ROI up to 10% annually"
  },
  {
    icon: Users,
    title: "Global Network",
    description: "Trusted by international investors seeking long-term partnerships"
  }
];
const AboutSection = () => {
  return /* @__PURE__ */ jsx("section", { id: "about", className: "py-16 md:py-24 bg-muted/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 md:px-12 lg:px-16 xl:px-24", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-12 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl font-bold text-foreground md:text-4xl", children: "Why Choose Sky Elite Real Estate" }),
      /* @__PURE__ */ jsx("p", { className: "mx-auto max-w-2xl text-muted-foreground", children: "We turn real estate into a structured journey of lasting growth, built on foresight, verified by regulation, and strengthened by long-term partnership." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-4", children: features$1.map((feature, index) => {
      const Icon = feature.icon;
      return /* @__PURE__ */ jsx(Card, { className: "border-none shadow-sm hover:shadow-md transition-shadow", children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-6", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10", children: /* @__PURE__ */ jsx(Icon, { className: "h-6 w-6 text-primary" }) }),
        /* @__PURE__ */ jsx("h3", { className: "mb-2 text-lg font-semibold text-foreground", children: feature.title }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: feature.description })
      ] }) }, index);
    }) })
  ] }) });
};
const testimonials = [
  {
    name: "Saad Hussain",
    content: "Sky Elite Real Estate made my property purchase seamless with their professionalism, honesty, and market expertise. They supported me throughout and treated my goals as their own. Highly recommended!",
    rating: 5
  },
  {
    name: "Ahmed Al-Mansoori",
    content: "Outstanding service and exceptional properties. The team's knowledge of Dubai's real estate market is impressive. They helped me secure an investment with guaranteed returns.",
    rating: 5
  },
  {
    name: "Sarah Johnson",
    content: "As an international investor, I needed a partner I could trust. Sky Elite provided transparent guidance throughout the entire process. Very satisfied with my investment.",
    rating: 5
  }
];
const TestimonialsSection = () => {
  return /* @__PURE__ */ jsx("section", { id: "testimonials", className: "py-16 md:py-24 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 md:px-12 lg:px-16 xl:px-24", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-12 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl font-bold text-foreground md:text-4xl", children: "Reviews From Our Happy Clients" }),
      /* @__PURE__ */ jsx("p", { className: "mx-auto max-w-2xl text-muted-foreground", children: "Trusted by investors worldwide for our commitment to excellence" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: testimonials.map((testimonial, index) => /* @__PURE__ */ jsx(Card, { className: "border-none shadow-sm", children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-6", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-4 flex gap-1", children: Array.from({ length: testimonial.rating }).map((_, i) => /* @__PURE__ */ jsx(Star, { className: "h-5 w-5 fill-secondary text-secondary" }, i)) }),
      /* @__PURE__ */ jsxs("p", { className: "mb-4 text-muted-foreground", children: [
        '"',
        testimonial.content,
        '"'
      ] }),
      /* @__PURE__ */ jsx("p", { className: "font-semibold text-foreground", children: testimonial.name })
    ] }) }, index)) })
  ] }) });
};
const damacLogo = "data:image/png;base64,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";
const binghattiLogo = "/assets/Logo-4-B-9JQc-C.png";
const aziziLogo = "data:image/png;base64,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";
const aldarLogo = "data:image/png;base64,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";
const PartnersSection$2 = () => {
  const trackRef = useRef(null);
  const partners = [
    { name: "EMAAR", logo: emaarLogo },
    { name: "DAMAC", logo: damacLogo },
    { name: "NAKHEEL", logo: nakheelLogo$1 },
    { name: "BINGHATTI", logo: binghattiLogo },
    { name: "AZIZI", logo: aziziLogo },
    { name: "ALDAR", logo: aldarLogo }
  ];
  const sliderItems = [...partners, ...partners];
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let position = 0;
    const speed = 0.6;
    const totalWidth = track.scrollWidth / 2;
    const animate = () => {
      position -= speed;
      if (Math.abs(position) >= totalWidth) {
        position = 0;
      }
      track.style.transform = `translateX(${position}px)`;
      requestAnimationFrame(animate);
    };
    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, []);
  return /* @__PURE__ */ jsx("section", { className: "border-y border-border bg-muted/30 py-12 overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 md:px-12 lg:px-16 xl:px-24", children: [
    /* @__PURE__ */ jsx("h3", { className: "mb-8 text-center text-xl font-semibold text-muted-foreground", children: "Our Official Partners" }),
    /* @__PURE__ */ jsx("div", { className: "relative w-full overflow-hidden", children: /* @__PURE__ */ jsx(
      "div",
      {
        ref: trackRef,
        className: "flex gap-8 items-center w-max",
        children: sliderItems.map((partner, index) => /* @__PURE__ */ jsx(
          "div",
          {
            className: "flex items-center justify-center rounded-lg bg-card p-2 transition-all hover:shadow-md min-w-[140px]",
            children: /* @__PURE__ */ jsx(
              "img",
              {
                src: partner.logo,
                alt: partner.name,
                className: "h-[80px] object-contain opacity-80 hover:opacity-100 transition"
              }
            )
          },
          index
        ))
      }
    ) })
  ] }) });
};
const logo = "/assets/logo-BGQFC35h.png";
const Footer = () => {
  return /* @__PURE__ */ jsx("footer", { className: "bg-card border-t border-border py-12", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 md:px-12 lg:px-16 xl:px-24", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid gap-8 md:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("img", { src: logo, alt: "Sky Elite Real Estate", className: "h-12 w-auto mb-4" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "We turn real estate into a structured journey of lasting growth, built on foresight, verified by regulation, and strengthened by long-term partnership." })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "mb-4 text-sm font-semibold text-foreground", children: "Quick Links" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#home", className: "hover:text-primary transition-colors", children: "Home" }) }),
          /* @__PURE__ */ jsx(Link, { to: "/about", children: /* @__PURE__ */ jsx("li", { className: "hover:text-primary transition-colors mt-2", children: "About Us" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#properties", className: "hover:text-primary transition-colors", children: "Properties" }) }),
          /* @__PURE__ */ jsx(Link, { to: "/testimonials", children: /* @__PURE__ */ jsx("li", { className: "hover:text-primary transition-colors mt-2", children: "Contact Us" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "mb-4 text-sm font-semibold text-foreground", children: "Legal" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsx(Link, { to: "/privacypolicy", children: /* @__PURE__ */ jsx("li", { className: "hover:text-primary transition-colors", children: "Privacy Policy" }) }),
          /* @__PURE__ */ jsx(Link, { to: "/termsconditions", children: /* @__PURE__ */ jsx("li", { className: "hover:text-primary transition-colors mt-2", children: "Terms & Conditions" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-primary transition-colors", children: "Cookie Policy" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "mb-4 text-sm font-semibold text-foreground", children: "Contact Us" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-3 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsx("span", { children: "+971 58 827 3634" })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Mail, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsx("span", { children: "info@skyelite.ae" })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsx("span", { children: "Dubai, UAE" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground", children: /* @__PURE__ */ jsx("p", { children: "© 2025 Sky Elite Real Estate. All rights reserved." }) })
  ] }) });
};
const Index = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Sky Elite Real Estate | Dubai Property Investment & Luxury Real Estate" }),
      /* @__PURE__ */ jsx("link", { rel: "icon", href: "/favicon.png" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Invest in Dubai's premium real estate with Sky Elite. Off-plan properties, ready investments, and luxury villas with guaranteed returns. RERA-backed, tax-efficient long-term partnerships for global investors."
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "keywords",
          content: "Dubai real estate, property investment Dubai, luxury villas Dubai, off-plan properties, EMAAR properties, DAMAC properties, real estate investment, Dubai apartments"
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "author", content: "Sky Elite Real Estate" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Luxurious 3-Bedroom Apartment in Downtown Dubai" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:description",
          content: "Connecting global investors to Dubai's performance-driven properties. Structured, tax-efficient, RERA-backed investments with guaranteed returns."
        }
      ),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: "https://elite-real-estate-five.vercel.app/?v=2" }),
      /* @__PURE__ */ jsx("meta", { property: "og:image", content: "https://elite-real-estate-five.vercel.app/share-image.jpg?v=2" }),
      /* @__PURE__ */ jsx("meta", { property: "og:image:width", content: "1200" }),
      /* @__PURE__ */ jsx("meta", { property: "og:image:height", content: "630" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: "Sky Elite Real Estate | Dubai Property Investment" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "twitter:description",
          content: "Premium Dubai real estate investments with guaranteed returns. Off-plan properties and luxury villas."
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: "https://elite-real-estate-five.vercel.app/share-image.jpg?v=2" }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://elite-real-estate-five.vercel.app/?v=2" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
      /* @__PURE__ */ jsx(Navbar, {}),
      /* @__PURE__ */ jsxs("main", { children: [
        /* @__PURE__ */ jsx(Hero, {}),
        /* @__PURE__ */ jsx(PropertyFilters, {}),
        /* @__PURE__ */ jsx(PropertiesSection, {}),
        /* @__PURE__ */ jsx(InvestmentBanner, {}),
        /* @__PURE__ */ jsx(AboutSection, {}),
        /* @__PURE__ */ jsx(TestimonialsSection, {}),
        /* @__PURE__ */ jsx(PartnersSection$2, {})
      ] }),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
};
const values = [
  {
    icon: Shield,
    title: "Integrity",
    description: "We maintain the highest standards of honesty and transparency in every transaction"
  },
  {
    icon: Heart,
    title: "Client-Centric",
    description: "Your success is our success. We prioritize your needs and goals above all"
  },
  {
    icon: Target,
    title: "Excellence",
    description: "We deliver exceptional service and results that exceed expectations"
  },
  {
    icon: Globe,
    title: "Global Vision",
    description: "Connecting international investors with Dubai's finest opportunities"
  }
];
const features = [
  {
    icon: Building2,
    title: "Premium Properties",
    description: "Exclusive access to Dubai's most sought-after real estate developments"
  },
  {
    icon: Shield,
    title: "RERA-Backed",
    description: "All properties verified and regulated by Dubai's Real Estate Regulatory Agency"
  },
  {
    icon: TrendingUp,
    title: "Guaranteed Returns",
    description: "Structured investments with guaranteed ROI up to 10% annually"
  },
  {
    icon: Users,
    title: "Global Network",
    description: "Trusted by international investors seeking long-term partnerships"
  }
];
const stats = [
  { value: "500+", label: "Properties Sold" },
  { value: "1000+", label: "Happy Clients" },
  { value: "15+", label: "Years Experience" },
  { value: "$2B+", label: "Property Value" }
];
const AboutUs = () => {
  const { id } = useParams();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "About Sky Elite Real Estate" }),
      /* @__PURE__ */ jsx("link", { rel: "icon", href: "/favicon.png" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Invest in Dubai's premium real estate with Sky Elite. Off-plan properties, ready investments, and luxury villas with guaranteed returns. RERA-backed, tax-efficient long-term partnerships for global investors."
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "keywords",
          content: "Dubai real estate, property investment Dubai, luxury villas Dubai, off-plan properties, EMAAR properties, DAMAC properties, real estate investment, Dubai apartments"
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "author", content: "Sky Elite Real Estate" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Luxurious 3-Bedroom Apartment in Downtown Dubai" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:description",
          content: "Connecting global investors to Dubai's performance-driven properties. Structured, tax-efficient, RERA-backed investments with guaranteed returns."
        }
      ),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: "https://elite-real-estate-five.vercel.app/?v=2" }),
      /* @__PURE__ */ jsx("meta", { property: "og:image", content: "https://elite-real-estate-five.vercel.app/share-image.jpg?v=2" }),
      /* @__PURE__ */ jsx("meta", { property: "og:image:width", content: "1200" }),
      /* @__PURE__ */ jsx("meta", { property: "og:image:height", content: "630" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: "Sky Elite Real Estate | Dubai Property Investment" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "twitter:description",
          content: "Premium Dubai real estate investments with guaranteed returns. Off-plan properties and luxury villas."
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: "https://elite-real-estate-five.vercel.app/share-image.jpg?v=2" }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://elite-real-estate-five.vercel.app/?v=2" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
      /* @__PURE__ */ jsx(Navbar, {}),
      /* @__PURE__ */ jsxs("main", { children: [
        /* @__PURE__ */ jsx("section", { className: "relative py-20 md:py-32 bg-gradient-to-br from-primary/5 via-accent/5 to-background", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 md:px-12 lg:px-16 xl:px-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-4xl text-center", children: [
          /* @__PURE__ */ jsxs("h1", { className: "mb-6 text-4xl font-bold text-foreground md:text-5xl lg:text-6xl", children: [
            "About",
            " ",
            /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent", children: "Sky Elite Real Estate" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mb-8 text-lg text-muted-foreground md:text-xl", children: "We turn real estate into a structured journey of lasting growth, built on foresight, verified by regulation, and strengthened by long-term partnership." }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center gap-4", children: [
            /* @__PURE__ */ jsx(Button, { size: "lg", children: "Contact Us" }),
            /* @__PURE__ */ jsx(Button, { size: "lg", variant: "outline", children: "View Properties" })
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsx("section", { className: "border-y border-border bg-muted/30 py-16", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 md:px-12 lg:px-16 xl:px-24", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-8 md:grid-cols-4", children: stats.map((stat, index) => /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "mb-2 text-3xl font-bold text-primary md:text-4xl", children: stat.value }),
          /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground md:text-base", children: stat.label })
        ] }, index)) }) }) }),
        /* @__PURE__ */ jsx("section", { className: "py-16 md:py-24 bg-background", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 md:px-12 lg:px-16 xl:px-24", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-12 lg:grid-cols-2 lg:gap-16 items-center", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "mb-6 text-3xl font-bold text-foreground md:text-4xl", children: "Our Story" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-muted-foreground", children: [
              /* @__PURE__ */ jsx("p", { children: "Founded with a vision to transform Dubai's real estate landscape, Sky Elite Real Estate has grown to become one of the most trusted names in luxury property investment." }),
              /* @__PURE__ */ jsx("p", { children: "Our journey began with a simple belief: that real estate investment should be transparent, structured, and accessible to international investors seeking long-term value." }),
              /* @__PURE__ */ jsx("p", { children: "Today, we pride ourselves on our track record of delivering exceptional properties backed by RERA regulation, offering guaranteed returns up to 10% annually, and building lasting partnerships with clients from around the world." })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx("div", { className: "aspect-[4/3] overflow-hidden rounded-lg bg-muted", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800",
              alt: "Dubai Skyline",
              className: "h-full w-full object-cover"
            }
          ) }) })
        ] }) }) }),
        /* @__PURE__ */ jsx("section", { className: "py-16 md:py-24 bg-muted/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 md:px-12 lg:px-16 xl:px-24", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-12 text-center", children: [
            /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl font-bold text-foreground md:text-4xl", children: "Our Core Values" }),
            /* @__PURE__ */ jsx("p", { className: "mx-auto max-w-2xl text-muted-foreground", children: "The principles that guide everything we do" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-4", children: values.map((value, index) => {
            const Icon = value.icon;
            return /* @__PURE__ */ jsx(Card, { className: "border-none shadow-sm hover:shadow-md transition-shadow", children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-6", children: [
              /* @__PURE__ */ jsx("div", { className: "mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10", children: /* @__PURE__ */ jsx(Icon, { className: "h-6 w-6 text-primary" }) }),
              /* @__PURE__ */ jsx("h3", { className: "mb-2 text-lg font-semibold text-foreground", children: value.title }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: value.description })
            ] }) }, index);
          }) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-16 md:py-24 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 md:px-12 lg:px-16 xl:px-24", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-12 text-center", children: [
            /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl font-bold text-foreground md:text-4xl", children: "Why Choose Sky Elite Real Estate" }),
            /* @__PURE__ */ jsx("p", { className: "mx-auto max-w-2xl text-muted-foreground", children: "What sets us apart in Dubai's competitive real estate market" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-4", children: features.map((feature, index) => {
            const Icon = feature.icon;
            return /* @__PURE__ */ jsx(Card, { className: "border-none shadow-sm hover:shadow-md transition-shadow", children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-6", children: [
              /* @__PURE__ */ jsx("div", { className: "mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10", children: /* @__PURE__ */ jsx(Icon, { className: "h-6 w-6 text-primary" }) }),
              /* @__PURE__ */ jsx("h3", { className: "mb-2 text-lg font-semibold text-foreground", children: feature.title }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: feature.description })
            ] }) }, index);
          }) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "bg-gradient-to-r from-primary to-accent py-16 md:py-20 text-white", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 md:px-12 lg:px-16 xl:px-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-4xl text-center", children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl font-bold md:text-4xl lg:text-5xl", children: "Ready to Start Your Investment Journey?" }),
          /* @__PURE__ */ jsx("p", { className: "mb-8 text-lg md:text-xl opacity-90", children: "Connect with our expert team today and discover exclusive opportunities" }),
          /* @__PURE__ */ jsx(Button, { size: "lg", variant: "secondary", className: "text-base", children: "Schedule a Consultation" })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
};
const offPlanProperties = [
  {
    id: "1",
    title: "Stylish Studio in Al Haseen 4",
    location: "Al Haseen-4, Dubai",
    price: "AED 379,000",
    type: "Off-Plan",
    area: "379 sq.ft",
    addedDate: "03 Sep 2025",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80"
  },
  {
    id: "2",
    title: "1 BHK in Dugasta Al Haseen 4",
    location: "Al Haseen-4, Dubai",
    price: "AED 1,427,989",
    type: "Off-Plan",
    bedrooms: 1,
    area: "650 sq.ft",
    addedDate: "03 Sep 2025",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80"
  },
  {
    id: "3",
    title: "Affordable Luxury Apartment",
    location: "Al Haseen-4, Dubai",
    price: "AED 538,888",
    type: "Off-Plan",
    bedrooms: 1,
    area: "550 sq.ft",
    addedDate: "30 Jul 2025",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"
  },
  {
    id: "4",
    title: "Premium 1 BHK with High Floor Views",
    location: "Al Haseen-4, Dubai",
    price: "AED 521,125",
    type: "Off-Plan",
    bedrooms: 1,
    area: "580 sq.ft",
    addedDate: "30 Jul 2025",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80"
  },
  {
    id: "5",
    title: "Luxury Villas Handing Over In 2029",
    location: "Selvara, Grand Polo Club & Resort, Dubai",
    price: "AED 6,286,888",
    type: "Off-Plan",
    bedrooms: 4,
    area: "3500 sq.ft",
    addedDate: "30 Jul 2025",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    featured: true
  }
];
const OffPlan = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Off-Plan Properties" }),
      /* @__PURE__ */ jsx("link", { rel: "icon", href: "/favicon.png" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Invest in Dubai's premium real estate with Sky Elite. Off-plan properties, ready investments, and luxury villas with guaranteed returns. RERA-backed, tax-efficient long-term partnerships for global investors."
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "keywords",
          content: "Dubai real estate, property investment Dubai, luxury villas Dubai, off-plan properties, EMAAR properties, DAMAC properties, real estate investment, Dubai apartments"
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "author", content: "Sky Elite Real Estate" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Luxurious 3-Bedroom Apartment in Downtown Dubai" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:description",
          content: "Connecting global investors to Dubai's performance-driven properties. Structured, tax-efficient, RERA-backed investments with guaranteed returns."
        }
      ),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: "https://elite-real-estate-five.vercel.app/?v=2" }),
      /* @__PURE__ */ jsx("meta", { property: "og:image", content: "https://elite-real-estate-five.vercel.app/Thumbnail.jpg?v=2" }),
      /* @__PURE__ */ jsx("meta", { property: "og:image:width", content: "1200" }),
      /* @__PURE__ */ jsx("meta", { property: "og:image:height", content: "630" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: "Sky Elite Real Estate | Dubai Property Investment" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "twitter:description",
          content: "Premium Dubai real estate investments with guaranteed returns. Off-plan properties and luxury villas."
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: "https://elite-real-estate-five.vercel.app/Thumbnail.jpg?v=2" }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://elite-real-estate-five.vercel.app/?v=2" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
      /* @__PURE__ */ jsx(Navbar, {}),
      /* @__PURE__ */ jsxs("main", { children: [
        /* @__PURE__ */ jsx(SecondaryPropertiesHero$2, {}),
        /* @__PURE__ */ jsx("section", { className: "border-b border-border/40 bg-background/95 backdrop-blur", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 md:px-12 lg:px-16 xl:px-24 py-8", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-5 items-end", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-foreground", children: "Select City" }),
            /* @__PURE__ */ jsxs(Select, { defaultValue: "dubai", children: [
              /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select city" }) }),
              /* @__PURE__ */ jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsx(SelectItem, { value: "dubai", children: "Dubai" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "abu-dhabi", children: "Abu Dhabi" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "sharjah", children: "Sharjah" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-foreground", children: "Property Type" }),
            /* @__PURE__ */ jsxs(Select, { defaultValue: "apartment", children: [
              /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Choose property" }) }),
              /* @__PURE__ */ jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsx(SelectItem, { value: "apartment", children: "Apartment" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "villa", children: "Villa" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "townhouse", children: "Townhouse" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-foreground", children: "Bedrooms" }),
            /* @__PURE__ */ jsxs(Select, { children: [
              /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Choose bedroom" }) }),
              /* @__PURE__ */ jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsx(SelectItem, { value: "studio", children: "Studio" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "1", children: "1 Bedroom" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "2", children: "2 Bedrooms" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "3", children: "3 Bedrooms" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "4+", children: "4+ Bedrooms" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-foreground", children: "Price Range" }),
            /* @__PURE__ */ jsxs(Select, { children: [
              /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Price" }) }),
              /* @__PURE__ */ jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsx(SelectItem, { value: "0-500k", children: "AED 0 - 500k" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "500k-1m", children: "AED 500k - 1M" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "1m-2m", children: "AED 1M - 2M" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "2m+", children: "AED 2M+" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs(Button, { className: "gap-2", children: [
            /* @__PURE__ */ jsx(Search, { className: "h-4 w-4" }),
            "Search"
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsx("section", { className: "py-16 md:py-24 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 md:px-12 lg:px-16 xl:px-24", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-8 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-foreground md:text-3xl", children: "Apartments for Sale in Dubai" }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-1", children: "Dubai South" })
            ] }),
            /* @__PURE__ */ jsxs(Select, { defaultValue: "newest", children: [
              /* @__PURE__ */ jsx(SelectTrigger, { className: "w-[180px]", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Sort by" }) }),
              /* @__PURE__ */ jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsx(SelectItem, { value: "newest", children: "Newest" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "price-low", children: "Price: Low to High" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "price-high", children: "Price: High to Low" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "area", children: "Area: Largest" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: offPlanProperties.map((property) => /* @__PURE__ */ jsx(PropertyCard, { ...property }, property.id)) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
};
function SecondaryPropertiesHero$2() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    category: "Buy",
    currency: "$",
    budgetMin: "",
    budgetMax: "",
    message: ""
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted successfully!");
    setIsPopupOpen(false);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "section",
      {
        className: "relative py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-accent/10",
        children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-[25px] sm:px-4 md:px-[90px]", children: /* @__PURE__ */ jsxs("div", { className: "text-white relative z-[1] max-w-[650px] ", children: [
          /* @__PURE__ */ jsx("span", { className: "mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary", children: "Services" }),
          /* @__PURE__ */ jsx("h1", { className: "mb-6 text-4xl font-bold text-foreground md:text-5xl lg:text-6xl", children: "Off-Plan Properties" }),
          /* @__PURE__ */ jsx("p", { className: "mb-8 text-lg text-muted-foreground md:text-xl", children: "Secure your future with off-plan properties with high returns and flexible payment plans. Explore premium developments that align with your investment goals." }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setIsPopupOpen(true),
              className: "mt-6 px-5 py-3 bg-[#2a416f] hover:bg-[#35528d] text-white rounded-lg transition-all",
              children: "Get Expert Advice"
            }
          )
        ] }) })
      }
    ),
    isPopupOpen && /* @__PURE__ */ jsx(
      "div",
      {
        className: `fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 transition-all duration-500 ${isPopupOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`,
        children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg w-[90%] max-w-[650px] h-[530px] mt-10 flex flex-col md:flex-row relative shadow-lg transition-all duration-500 transform animate-slideDown p-2", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setIsPopupOpen(false),
              className: "absolute top-2 right-3 text-gray-600 hover:text-gray-800 text-3xl font-light z-10",
              children: "×"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "hidden md:block md:w-1/2 h-full", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: "https://skyeliterealestate.com/assets/images/home/Mask%20group.png",
              alt: "House",
              className: "w-full h-full object-cover rounded-l-lg"
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "w-full md:w-1/2 p-4 flex flex-col justify-between h-full", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-2 text-gray-800 text-center", children: "Let's Connect!" }),
            /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-2 flex-1 flex flex-col justify-between", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    name: "fullName",
                    value: formData.fullName,
                    onChange: handleInputChange,
                    placeholder: "Full Name",
                    required: true,
                    className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "email",
                    name: "email",
                    value: formData.email,
                    onChange: handleInputChange,
                    placeholder: "Email Address",
                    required: true,
                    className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "tel",
                    name: "phoneNumber",
                    value: formData.phoneNumber,
                    onChange: handleInputChange,
                    placeholder: "Phone Number",
                    required: true,
                    className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                  }
                ),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h5", { className: "text-gray-700 font-semibold mb-1", children: "Budget Range" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex gap-2 flex-wrap", children: [
                    /* @__PURE__ */ jsxs(
                      "select",
                      {
                        name: "currency",
                        value: formData.currency,
                        onChange: handleInputChange,
                        className: "flex-[0_0_90px] px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none",
                        children: [
                          /* @__PURE__ */ jsx("option", { value: "$", children: "USD" }),
                          /* @__PURE__ */ jsx("option", { value: "AED", children: "AED" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "number",
                        name: "budgetMin",
                        value: formData.budgetMin,
                        onChange: handleInputChange,
                        placeholder: "Min",
                        min: "0",
                        required: true,
                        className: "flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "number",
                        name: "budgetMax",
                        value: formData.budgetMax,
                        onChange: handleInputChange,
                        placeholder: "Max",
                        min: "0",
                        required: true,
                        className: "flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    name: "message",
                    value: formData.message,
                    onChange: handleInputChange,
                    placeholder: "Type your message...",
                    className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 resize-none outline-none"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  className: "w-full bg-[#1FA7E1] text-white py-3 rounded-md hover:bg-[#1890c9] transition-all mt-2",
                  children: "Submit"
                }
              )
            ] })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx("style", { children: `
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown {
          animation: slideDown 0.4s ease-out;
        }
      ` })
  ] });
}
const CarouselContext = React.createContext(null);
function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}
const Carousel = React.forwardRef(
  ({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y"
      },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);
    const onSelect = React.useCallback((api2) => {
      if (!api2) {
        return;
      }
      setCanScrollPrev(api2.canScrollPrev());
      setCanScrollNext(api2.canScrollNext());
    }, []);
    const scrollPrev = React.useCallback(() => {
      api == null ? void 0 : api.scrollPrev();
    }, [api]);
    const scrollNext = React.useCallback(() => {
      api == null ? void 0 : api.scrollNext();
    }, [api]);
    const handleKeyDown = React.useCallback(
      (event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext]
    );
    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }
      setApi(api);
    }, [api, setApi]);
    React.useEffect(() => {
      if (!api) {
        return;
      }
      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);
      return () => {
        api == null ? void 0 : api.off("select", onSelect);
      };
    }, [api, onSelect]);
    return /* @__PURE__ */ jsx(
      CarouselContext.Provider,
      {
        value: {
          carouselRef,
          api,
          opts,
          orientation: orientation || ((opts == null ? void 0 : opts.axis) === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext
        },
        children: /* @__PURE__ */ jsx(
          "div",
          {
            ref,
            onKeyDownCapture: handleKeyDown,
            className: cn("relative", className),
            role: "region",
            "aria-roledescription": "carousel",
            ...props,
            children
          }
        )
      }
    );
  }
);
Carousel.displayName = "Carousel";
const CarouselContent = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel();
    return /* @__PURE__ */ jsx("div", { ref: carouselRef, className: "overflow-hidden", children: /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className),
        ...props
      }
    ) });
  }
);
CarouselContent.displayName = "CarouselContent";
const CarouselItem = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel();
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        role: "group",
        "aria-roledescription": "slide",
        className: cn("min-w-0 shrink-0 grow-0 basis-full", orientation === "horizontal" ? "pl-4" : "pt-4", className),
        ...props
      }
    );
  }
);
CarouselItem.displayName = "CarouselItem";
const CarouselPrevious = React.forwardRef(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();
    return /* @__PURE__ */ jsxs(
      Button,
      {
        ref,
        variant,
        size,
        className: cn(
          "absolute h-8 w-8 rounded-full",
          orientation === "horizontal" ? "-left-12 top-1/2 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
          className
        ),
        disabled: !canScrollPrev,
        onClick: scrollPrev,
        ...props,
        children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Previous slide" })
        ]
      }
    );
  }
);
CarouselPrevious.displayName = "CarouselPrevious";
const CarouselNext = React.forwardRef(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel();
    return /* @__PURE__ */ jsxs(
      Button,
      {
        ref,
        variant,
        size,
        className: cn(
          "absolute h-8 w-8 rounded-full",
          orientation === "horizontal" ? "-right-12 top-1/2 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
          className
        ),
        disabled: !canScrollNext,
        onClick: scrollNext,
        ...props,
        children: [
          /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Next slide" })
        ]
      }
    );
  }
);
CarouselNext.displayName = "CarouselNext";
const Separator = React.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ jsx(
  SeparatorPrimitive.Root,
  {
    ref,
    decorative,
    orientation,
    className: cn("shrink-0 bg-border", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className),
    ...props
  }
));
Separator.displayName = SeparatorPrimitive.Root.displayName;
const Avatar = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Root,
  {
    ref,
    className: cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className),
    ...props
  }
));
Avatar.displayName = AvatarPrimitive.Root.displayName;
const AvatarImage = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AvatarPrimitive.Image, { ref, className: cn("aspect-square h-full w-full", className), ...props }));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Fallback,
  {
    ref,
    className: cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className),
    ...props
  }
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;
const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity data-[state=open]:bg-accent data-[state=open]:text-muted-foreground hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Description, { ref, className: cn("text-sm text-muted-foreground", className), ...props }));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
const heroProperty5 = "/assets/hero-property-2-Be8Skq28.jpg";
function SuccessModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-white text-center rounded-2xl shadow-xl w-full max-w-lg animate-fadeIn p-5", children: [
    /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-gradient-to-br bg-[#3f547d] rounded-full flex items-center justify-center mx-auto -mt-10 shadow-lg", children: /* @__PURE__ */ jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        className: "h-10 w-10 text-white",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "3",
        children: /* @__PURE__ */ jsx("path", { d: "M5 13l4 4L19 7" })
      }
    ) }),
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-800 mt-4", children: "Awesome!" }),
    /* @__PURE__ */ jsx("p", { className: "text-gray-600 mt-2", children: "Your Account has been created successfully" }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: onClose,
        className: "mt-6 w-full bg-[#3f547d] text-white font-semibold py-3 rounded-xl shadow hover:opacity-90 transition",
        children: "OK"
      }
    )
  ] }) });
}
const PropertyDetails$1 = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);
  const property = {
    id,
    title: "Luxurious 3-Bedroom Apartment in Downtown Dubai",
    location: "Business Bay, Dubai",
    price: "AED 2,850,000",
    type: "Off-Plan",
    bedrooms: 3,
    bathrooms: 3,
    area: "2,150 sqft",
    parkingSpaces: 2,
    completionDate: "Q4 2025",
    featured: true,
    roi: "8.5%",
    images: [heroProperty1, heroProperty2, heroProperty3, heroProperty4, heroProperty5],
    description: `Experience luxury living in this stunning 3-bedroom apartment located in the heart of Dubai's prestigious Business Bay. This modern residence offers breathtaking views of the Dubai skyline and combines contemporary design with exceptional comfort.

The spacious layout features floor-to-ceiling windows that flood the space with natural light, premium finishes throughout, and a thoughtfully designed floor plan that maximizes both space and functionality. The open-concept living and dining area seamlessly flows to a private balcony, perfect for entertaining or relaxing while enjoying panoramic city views.`,
    details: {
      propertyType: "Apartment",
      listingType: "Off-Plan",
      developer: "Emaar Properties",
      bedrooms: 3,
      bathrooms: 3,
      size: "2,150 sqft",
      parkingSpaces: 2,
      furnished: "Unfurnished",
      floor: "15th Floor",
      buildingFloors: "35 Floors",
      completionDate: "Q4 2025",
      paymentPlan: "60/40"
    },
    amenities: [
      { icon: Wifi, name: "High-Speed WiFi" },
      { icon: Dumbbell, name: "State-of-the-art Gym" },
      { icon: Droplets, name: "Swimming Pool" },
      { icon: Shield, name: "24/7 Security" },
      { icon: Car, name: "Covered Parking" },
      { icon: Wind, name: "Central AC" },
      { icon: TreePine, name: "Landscaped Gardens" },
      { icon: Users, name: "Kids Play Area" },
      { icon: Package, name: "Concierge Service" },
      { icon: Camera, name: "CCTV Surveillance" }
    ],
    locationDetails: {
      community: "Business Bay",
      city: "Dubai",
      nearbyLandmarks: ["Burj Khalifa (5 min)", "Dubai Mall (7 min)", "Dubai Marina (15 min)"],
      schoolsHospitals: "10-15 minutes drive"
    },
    agent: {
      name: "Muhammad Shahbaz Khan",
      role: "Senior Property Consultant",
      phone: "+971 58 827 3634",
      email: "shahbaz@skyelite.com",
      image: "",
      initials: "MS"
    }
  };
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
    agentEmail: "talalkhan@eliteconsultingsllc.com"
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Message Sent!");
    setIsOpen(false);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      message: "",
      agentEmail: "talalkhan@eliteconsultingsllc.com"
    });
  };
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("main", { className: "container mx-auto px-[25px] sm:px-4 md:px-[58px] py-8 max-w-7xl", children: [
      /* @__PURE__ */ jsx("section", { className: "mb-8", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-[1fr_350px] gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs(Dialog, { children: [
            /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
              "div",
              {
                className: "relative aspect-[16/9] w-full overflow-hidden rounded-xl cursor-pointer hover:opacity-90 transition-opacity group",
                onClick: () => setSelectedImage(0),
                children: [
                  /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: property.images[0],
                      alt: `${property.title} - Main`,
                      className: "h-full w-full object-cover"
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center", children: /* @__PURE__ */ jsx(Camera, { className: "h-10 w-10 text-white opacity-0 group-hover:opacity-100 transition-opacity" }) })
                ]
              }
            ) }),
            /* @__PURE__ */ jsx(DialogContent, { className: "max-w-5xl w-full p-0", children: /* @__PURE__ */ jsxs(Carousel, { className: "w-full", children: [
              /* @__PURE__ */ jsx(CarouselContent, { children: property.images.map((image, index) => /* @__PURE__ */ jsx(CarouselItem, { children: /* @__PURE__ */ jsx("div", { className: "relative aspect-[16/9] w-full overflow-hidden", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: image,
                  alt: `${property.title} - Image ${index + 1}`,
                  className: "h-full w-full object-contain bg-black"
                }
              ) }) }, index)) }),
              /* @__PURE__ */ jsx(CarouselPrevious, { className: "left-4" }),
              /* @__PURE__ */ jsx(CarouselNext, { className: "right-4" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 gap-3", children: property.images.slice(1, 5).map((image, index) => /* @__PURE__ */ jsxs(Dialog, { children: [
            /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
              "div",
              {
                className: "relative aspect-[4/3] w-full overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity group",
                onClick: () => setSelectedImage(index + 1),
                children: [
                  /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: image,
                      alt: `${property.title} - ${index + 2}`,
                      className: "h-full w-full object-cover"
                    }
                  ),
                  index === 3 && property.images.length > 5 && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/70 flex items-center justify-center", children: /* @__PURE__ */ jsxs("span", { className: "text-white font-semibold text-sm", children: [
                    "+",
                    property.images.length - 5
                  ] }) })
                ]
              }
            ) }),
            /* @__PURE__ */ jsx(DialogContent, { className: "max-w-5xl w-full p-0", children: /* @__PURE__ */ jsxs(Carousel, { className: "w-full", children: [
              /* @__PURE__ */ jsx(CarouselContent, { children: property.images.map((img, idx) => /* @__PURE__ */ jsx(CarouselItem, { children: /* @__PURE__ */ jsx("div", { className: "relative aspect-[16/9] w-full overflow-hidden", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: img,
                  alt: `${property.title} - Image ${idx + 1}`,
                  className: "h-full w-full object-contain bg-black"
                }
              ) }) }, idx)) }),
              /* @__PURE__ */ jsx(CarouselPrevious, { className: "left-4" }),
              /* @__PURE__ */ jsx(CarouselNext, { className: "right-4" })
            ] }) })
          ] }, index)) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "relative w-full overflow-hidden rounded-xl bg-muted h-[230px] md:h-[350px] lg:h-[445px]", children: /* @__PURE__ */ jsx(
          "iframe",
          {
            src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14437.869987554975!2d55.26578!3d25.186336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f682829c85bf9%3A0x4a3e9e3e8c8e8e8e!2sBusiness%20Bay%2C%20Dubai!5e0!3m2!1sen!2sae!4v1234567890123",
            width: "100%",
            height: "100%",
            style: { border: 0 },
            allowFullScreen: true,
            loading: "lazy",
            referrerPolicy: "no-referrer-when-downgrade",
            title: "Property Location Map",
            className: "absolute inset-0"
          }
        ) })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-3 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 mb-3", children: [
              /* @__PURE__ */ jsx(Badge, { className: "bg-primary text-primary-foreground", children: property.type }),
              /* @__PURE__ */ jsx(Badge, { className: "bg-secondary text-secondary-foreground", children: "Featured" }),
              /* @__PURE__ */ jsxs(Badge, { className: "bg-accent text-accent-foreground", children: [
                "ROI ",
                property.roi
              ] })
            ] }),
            /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-4xl font-bold text-foreground mb-3", children: property.title }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-muted-foreground mb-4", children: [
              /* @__PURE__ */ jsx(MapPin, { className: "h-5 w-5" }),
              /* @__PURE__ */ jsx("span", { className: "text-lg", children: property.location })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between flex-wrap gap-4", children: [
              /* @__PURE__ */ jsx("p", { className: "text-3xl md:text-4xl font-bold text-primary", children: property.price }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsx(Button, { variant: "outline", size: "icon", children: /* @__PURE__ */ jsx(Share2, { className: "h-5 w-5" }) }),
                /* @__PURE__ */ jsx(Button, { variant: "outline", size: "icon", children: /* @__PURE__ */ jsx(Heart, { className: "h-5 w-5" }) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx(Separator, { className: "my-6" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-8", children: [
            /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "p-4 flex flex-col items-center text-center", children: [
              /* @__PURE__ */ jsx(Bed, { className: "h-8 w-8 text-primary mb-2" }),
              /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-foreground", children: property.bedrooms }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Bedrooms" })
            ] }) }),
            /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "p-4 flex flex-col items-center text-center", children: [
              /* @__PURE__ */ jsx(Bath, { className: "h-8 w-8 text-primary mb-2" }),
              /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-foreground", children: property.bathrooms }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Bathrooms" })
            ] }) }),
            /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "p-4 flex flex-col items-center text-center", children: [
              /* @__PURE__ */ jsx(Square, { className: "h-8 w-8 text-primary mb-2" }),
              /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-foreground", children: property.area }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Area" })
            ] }) }),
            /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "p-4 flex flex-col items-center text-center", children: [
              /* @__PURE__ */ jsx(Car, { className: "h-8 w-8 text-primary mb-2" }),
              /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-foreground", children: property.parkingSpaces }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Parking" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs(Tabs, { defaultValue: "overview", className: "w-full", children: [
            /* @__PURE__ */ jsxs(TabsList, { className: "w-full grid grid-cols-3 mb-6 bg-muted/40 rounded-lg p-1", children: [
              /* @__PURE__ */ jsx(
                TabsTrigger,
                {
                  value: "overview",
                  className: "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium rounded-md transition-all",
                  children: "Overview"
                }
              ),
              /* @__PURE__ */ jsx(
                TabsTrigger,
                {
                  value: "details",
                  className: "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium rounded-md transition-all",
                  children: "Details"
                }
              ),
              /* @__PURE__ */ jsx(
                TabsTrigger,
                {
                  value: "amenities",
                  className: "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium rounded-md transition-all",
                  children: "Amenities"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs(TabsContent, { value: "overview", className: "space-y-6", children: [
              /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "p-6", children: [
                /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-foreground mb-4", children: "Property Description" }),
                /* @__PURE__ */ jsx("div", { className: "text-muted-foreground space-y-4 leading-relaxed", children: property.description.split("\n\n").map((paragraph, index) => /* @__PURE__ */ jsx("p", { children: paragraph }, index)) })
              ] }) }),
              /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "p-6", children: [
                /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-foreground mb-4 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(MapPin, { className: "h-5 w-5 text-primary" }),
                  "Location & Community"
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Community" }),
                      /* @__PURE__ */ jsx("p", { className: "font-semibold text-foreground", children: property.locationDetails.community })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "City" }),
                      /* @__PURE__ */ jsx("p", { className: "font-semibold text-foreground", children: property.locationDetails.city })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-2", children: "Nearby Landmarks" }),
                    /* @__PURE__ */ jsx("ul", { className: "space-y-1", children: property.locationDetails.nearbyLandmarks.map((landmark, index) => /* @__PURE__ */ jsxs("li", { className: "text-foreground flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx("div", { className: "h-1.5 w-1.5 rounded-full bg-primary" }),
                      landmark
                    ] }, index)) })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Schools & Hospitals" }),
                    /* @__PURE__ */ jsx("p", { className: "font-semibold text-foreground", children: property.locationDetails.schoolsHospitals })
                  ] })
                ] })
              ] }) })
            ] }),
            /* @__PURE__ */ jsx(TabsContent, { value: "details", children: /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "p-6", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-foreground mb-4", children: "Property Details" }),
              /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-4", children: Object.entries(property.details).map(([key, value]) => /* @__PURE__ */ jsxs("div", { className: "flex justify-between py-3 border-b border-border", children: [
                /* @__PURE__ */ jsx("span", { className: "text-muted-foreground capitalize", children: key.replace(/([A-Z])/g, " $1").trim() }),
                /* @__PURE__ */ jsx("span", { className: "font-semibold text-foreground", children: value })
              ] }, key)) })
            ] }) }) }),
            /* @__PURE__ */ jsx(TabsContent, { value: "amenities", children: /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "p-6", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-foreground mb-4", children: "Amenities & Features" }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4", children: property.amenities.map((amenity, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors", children: [
                /* @__PURE__ */ jsx(amenity.icon, { className: "h-5 w-5 text-primary flex-shrink-0" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-foreground", children: amenity.name })
              ] }, index)) })
            ] }) }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsx(Card, { className: "sticky top-24", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-foreground mb-4", children: "Contact Agent" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
            /* @__PURE__ */ jsxs(Avatar, { className: "h-16 w-16", children: [
              /* @__PURE__ */ jsx(AvatarImage, { src: property.agent.image, alt: property.agent.name }),
              /* @__PURE__ */ jsx(AvatarFallback, { className: "bg-primary text-primary-foreground text-lg", children: property.agent.initials })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-bold text-foreground", children: property.agent.name }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: property.agent.role })
            ] })
          ] }),
          /* @__PURE__ */ jsx(Separator, { className: "my-4" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3 mb-6", children: [
            /* @__PURE__ */ jsxs("a", { href: `tel:${property.agent.phone}`, className: "flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors", children: [
              /* @__PURE__ */ jsx(Phone, { className: "h-5 w-5" }),
              /* @__PURE__ */ jsx("span", { children: property.agent.phone })
            ] }),
            /* @__PURE__ */ jsxs("a", { href: `mailto:${property.agent.email}`, className: "flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors", children: [
              /* @__PURE__ */ jsx(Mail, { className: "h-5 w-5" }),
              /* @__PURE__ */ jsx("span", { className: "break-all", children: property.agent.email })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs(Button, { className: "w-full", size: "lg", children: [
              /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4 mr-2" }),
              "Call Now"
            ] }),
            /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "w-full", size: "lg", onClick: () => setOpen(true), children: [
              /* @__PURE__ */ jsx(MessageSquare, { className: "h-4 w-4 mr-2" }),
              "Send Message"
            ] }),
            /* @__PURE__ */ jsxs(
              Button,
              {
                variant: "outline",
                className: "w-full",
                size: "lg",
                onClick: () => setIsOpen(true),
                children: [
                  /* @__PURE__ */ jsx(Mail, { className: "h-4 w-4 mr-2" }),
                  "Email Agent"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx(Separator, { className: "my-6" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-foreground", children: "Property Reference" }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
              "SKY-",
              property.id
            ] })
          ] })
        ] }) }) }),
        isOpen && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/40 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-xl w-80 max-w-xs animate-fadeIn", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-[#3f547d] text-white px-4 py-3 rounded-t-2xl flex justify-between items-center", children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-md font-bold flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Mail, { className: "h-5 w-5" }),
              "Contact Agent"
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setIsOpen(false),
                className: "text-white hover:text-gray-300",
                children: "✕"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "p-4 bg-gray-50 rounded-b-2xl", children: /* @__PURE__ */ jsxs("form", { className: "space-y-2", onSubmit: handleSubmit, children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "font-semibold block mb-1 text-sm", children: "Full Name" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  name: "fullName",
                  value: formData.fullName,
                  onChange: handleChange,
                  placeholder: "Enter your name",
                  className: "w-full p-2 rounded-lg shadow-sm border focus:ring-2 focus:ring-blue-500 outline-none text-sm",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "font-semibold block mb-1 text-sm", children: "Email Address" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "email",
                  name: "email",
                  value: formData.email,
                  onChange: handleChange,
                  placeholder: "you@example.com",
                  className: "w-full p-2 rounded-lg shadow-sm border focus:ring-2 focus:ring-blue-500 outline-none text-sm",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "font-semibold block mb-1 text-sm", children: "Phone Number" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "tel",
                  name: "phone",
                  value: formData.phone,
                  onChange: handleChange,
                  placeholder: "+971 5X XXX XXXX",
                  className: "w-full p-2 rounded-lg shadow-sm border focus:ring-2 focus:ring-blue-500 outline-none text-sm",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "font-semibold block mb-1 text-sm", children: "Your Message" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  name: "message",
                  value: formData.message,
                  onChange: handleChange,
                  placeholder: "Write your message here...",
                  className: "w-full p-2 rounded-lg shadow-sm border focus:ring-2 focus:ring-blue-500 outline-none resize-none text-sm",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsx("input", { type: "hidden", name: "agentEmail", value: formData.agentEmail }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                className: "w-full bg-[#3f547d] text-white py-2 rounded-lg font-medium hover:bg-[#4a69a3] transition text-sm",
                children: "Contact Us"
              }
            )
          ] }) })
        ] }) }),
        open && /* @__PURE__ */ jsx(SuccessModal, { isOpen: open, onClose: () => setOpen(false) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mt-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-foreground mb-6", children: "Similar Properties" }),
        /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-6", children: [1, 2, 3].map((item) => /* @__PURE__ */ jsxs(Card, { className: "group overflow-hidden hover:shadow-lg transition-all duration-300", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative aspect-[4/3] overflow-hidden", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: heroProperty1,
                alt: "Similar property",
                className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              }
            ),
            /* @__PURE__ */ jsx(Badge, { className: "absolute top-4 left-4 bg-primary text-primary-foreground", children: "Off-Plan" })
          ] }),
          /* @__PURE__ */ jsxs(CardContent, { className: "p-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-foreground mb-2 line-clamp-1", children: "Modern Apartment in Business Bay" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-3", children: "Business Bay, Dubai" }),
            /* @__PURE__ */ jsx("p", { className: "text-xl font-bold text-primary mb-3", children: "AED 2,500,000" }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-4 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsx(Bed, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsx("span", { children: "3 Beds" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsx(Square, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsx("span", { children: "2,000 sqft" })
              ] })
            ] })
          ] })
        ] }, item)) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] }) });
};
const blogPosts$1 = [
  {
    id: 1,
    title: "Why DMCC is Emerging as the Crypto & Commodities Bridge",
    excerpt: "Within the heart of Dubai, the Dubai Multi Commodities Centre (DMCC) is transforming commerce. Originally a go...",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    author: {
      name: "Muhammad Shahbaz Khan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Muhammad",
      initials: "MSK"
    },
    date: "November 7, 2025",
    readTime: "5 min read",
    category: "Crypto & Investment"
  },
  {
    id: 2,
    title: "Best Areas to Invest in Dubai 2025: Dubai South Tops the List",
    excerpt: "Why Dubai? A Global Investment Magnet Dubai has certainly established its reputation as one of the most d...",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    author: {
      name: "Tallal Khan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tallal",
      initials: "TK"
    },
    date: "October 10, 2025",
    readTime: "7 min read",
    category: "Investment Guide"
  },
  {
    id: 3,
    title: "Why 2025 Is the Perfect Year for Singaporean Investors to Back Dubai",
    excerpt: "Dubai's growth is hard to ignore. It has quickly become one of the top places to live and invest in the world...",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80",
    author: {
      name: "Muhammad Shahbaz Khan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Muhammad",
      initials: "MSK"
    },
    date: "August 28, 2025",
    readTime: "6 min read",
    category: "International Investment"
  },
  {
    id: 4,
    title: "Tokenized Real Estate: How Chinese Investors Are Betting on Dubai",
    excerpt: "The future of real estate isn't around the corner; it's already unfolding. In May 2025 alone, Dubai recorded o...",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    author: {
      name: "Muhammad Shahbaz Khan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Muhammad",
      initials: "MSK"
    },
    date: "August 28, 2025",
    readTime: "8 min read",
    category: "Blockchain & Real Estate"
  },
  {
    id: 5,
    title: "Short term rental profits surge in Dubai for Nigerian investors",
    excerpt: "The splendor of the skyline of Dubai is more than reassuring, opportunities overflow in that place. Those opp...",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    author: {
      name: "Muhammad Shahbaz Khan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Muhammad",
      initials: "MSK"
    },
    date: "August 12, 2025",
    readTime: "5 min read",
    category: "Rental Market"
  },
  {
    id: 6,
    title: "Why UK and Gulf Investors Are Flocking to Dubai in 2025",
    excerpt: "Dubai is among the best places to visit in 2025. It has busy streets, thrumming cities, and the highest...",
    image: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=800&q=80",
    author: {
      name: "Muhammad Shahbaz Khan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Muhammad",
      initials: "MSK"
    },
    date: "August 9, 2025",
    readTime: "6 min read",
    category: "Market Trends"
  }
];
const PropertyDetails = () => {
  const { id } = useParams();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Our Blog" }),
      /* @__PURE__ */ jsx("link", { rel: "icon", href: "/favicon.png" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Invest in Dubai's premium real estate with Sky Elite. Off-plan properties, ready investments, and luxury villas with guaranteed returns. RERA-backed, tax-efficient long-term partnerships for global investors."
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "keywords",
          content: "Dubai real estate, property investment Dubai, luxury villas Dubai, off-plan properties, EMAAR properties, DAMAC properties, real estate investment, Dubai apartments"
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "author", content: "Sky Elite Real Estate" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: " Luxurious 3-Bedroom Apartment in Downtown Dubai" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:description",
          content: "Connecting global investors to Dubai's performance-driven properties. Structured, tax-efficient, RERA-backed investments with guaranteed returns."
        }
      ),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: "https://elite-real-estate-five.vercel.app/?v=2" }),
      /* @__PURE__ */ jsx("meta", { property: "og:image", content: "https://elite-real-estate-five.vercel.app/share-image.jpg?v=2" }),
      /* @__PURE__ */ jsx("meta", { property: "og:image:width", content: "1200" }),
      /* @__PURE__ */ jsx("meta", { property: "og:image:height", content: "630" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: "Sky Elite Real Estate | Dubai Property Investment" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "twitter:description",
          content: "Premium Dubai real estate investments with guaranteed returns. Off-plan properties and luxury villas."
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: "https://elite-real-estate-five.vercel.app/share-image.jpg?v=2" }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://elite-real-estate-five.vercel.app/?v=2" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
      /* @__PURE__ */ jsx(Navbar, {}),
      /* @__PURE__ */ jsx("section", { className: "relative bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20 md:py-32", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 md:px-12 lg:px-16 xl:px-24", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl", children: [
        /* @__PURE__ */ jsx("h1", { className: "inline-block pb-3 leading-[1.1] text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent", children: "Our Blog" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg md:text-xl text-muted-foreground", children: "Stay updated with the latest insights, trends, and expert analysis on Dubai's real estate market." })
      ] }) }) }),
      /* @__PURE__ */ jsx("section", { className: "py-16 md:py-24", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 md:px-12 lg:px-16 xl:px-24", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: blogPosts$1.map((post) => /* @__PURE__ */ jsxs(Card, { className: "group overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col", children: [
        /* @__PURE__ */ jsx(Link, { to: `/blog/${post.id}`, children: /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden aspect-[16/10]", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: post.image,
              alt: post.title,
              className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute top-4 left-4", children: /* @__PURE__ */ jsx("span", { className: "bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1 rounded-full text-xs font-medium", children: post.category }) })
        ] }) }),
        /* @__PURE__ */ jsxs(CardHeader, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxs(Avatar, { className: "h-10 w-10 border-2 border-primary/20", children: [
              /* @__PURE__ */ jsx(AvatarImage, { src: post.author.avatar, alt: post.author.name }),
              /* @__PURE__ */ jsx(AvatarFallback, { className: "bg-primary/10 text-primary text-xs font-semibold", children: post.author.initials })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-foreground truncate", children: post.author.name }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsx(Calendar, { className: "h-3 w-3" }),
                /* @__PURE__ */ jsx("span", { children: post.date })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2", children: post.title })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { className: "flex-grow", children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground line-clamp-3", children: post.excerpt }) }),
        /* @__PURE__ */ jsxs(CardFooter, { className: "flex items-center justify-between pt-4 border-t", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsx(Clock, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsx("span", { children: post.readTime })
          ] }),
          /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", className: "group/btn", asChild: true, children: /* @__PURE__ */ jsxs(Link, { to: `/blog/${post.id}`, children: [
            "Read More",
            /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" })
          ] }) })
        ] })
      ] }, post.id)) }) }) }),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
};
const blogPosts = [
  {
    id: 1,
    title: "Why DMCC is Emerging as the Crypto & Commodities Bridge",
    excerpt: "Within the heart of Dubai, the Dubai Multi Commodities Centre (DMCC) is transforming commerce. Originally a go...",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
    author: {
      name: "Muhammad Shahbaz Khan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Muhammad",
      initials: "MSK",
      bio: "Real estate investment expert with over 10 years of experience in Dubai's property market. Specialized in crypto and blockchain real estate investments."
    },
    date: "November 7, 2025",
    readTime: "5 min read",
    category: "Crypto & Investment",
    content: {
      intro: "Within the heart of Dubai, the Dubai Multi Commodities Centre (DMCC) is transforming commerce. Originally a gold and diamond trading hub, DMCC has evolved into a global business district that bridges traditional commodities with cutting-edge digital assets.",
      sections: [
        {
          heading: "The Evolution of DMCC",
          subheading: "From Traditional to Digital",
          paragraphs: [
            "DMCC has undergone a remarkable transformation over the past decade. What started as a specialized free zone for precious metals and commodities trading has become one of the world's most forward-thinking business districts.",
            "Today, DMCC hosts over 21,000 companies from 170+ countries, making it the world's largest free zone by the number of companies. This diverse ecosystem creates unique opportunities for innovation and collaboration across traditional and digital sectors."
          ]
        },
        {
          heading: "Why Crypto Companies Choose DMCC",
          subheading: "Regulatory Clarity and Infrastructure",
          paragraphs: [
            "The UAE's progressive stance on cryptocurrency regulation has made DMCC an attractive destination for crypto businesses. The Virtual Assets Regulatory Authority (VARA) provides clear guidelines that give companies the confidence to operate and innovate.",
            "DMCC's Crypto Centre, launched in 2021, offers specialized support for blockchain and cryptocurrency companies. From licensing to networking, the centre provides comprehensive services tailored to the unique needs of digital asset businesses.",
            "The infrastructure in DMCC is second to none. High-speed connectivity, state-of-the-art office spaces, and proximity to other financial institutions create an ideal environment for crypto companies to thrive."
          ]
        },
        {
          heading: "Investment Opportunities",
          subheading: "Real Estate Meets Digital Assets",
          paragraphs: [
            "The intersection of real estate and cryptocurrency at DMCC creates fascinating investment opportunities. Properties in the area are increasingly being purchased using digital assets, and some developers are even offering tokenized real estate investments.",
            "Office spaces in DMCC have seen significant appreciation, driven by the influx of high-value crypto and fintech companies. For investors, this represents a unique opportunity to participate in the growth of both physical infrastructure and the digital economy.",
            "The average rental yields in DMCC range from 7-9%, which is attractive compared to many global business districts. Add to this the potential for capital appreciation, and DMCC becomes a compelling investment destination."
          ]
        },
        {
          heading: "The Future Outlook",
          subheading: "What's Next for DMCC",
          paragraphs: [
            "DMCC continues to invest heavily in infrastructure and services. Recent announcements include expansions of the Crypto Centre and new initiatives to attract Web3 and metaverse companies.",
            "The integration of traditional commodities trading with digital assets is just beginning. As blockchain technology matures, we can expect to see more innovative applications that leverage DMCC's unique position at the intersection of these worlds.",
            "For investors and businesses alike, DMCC represents a rare opportunity to be part of a transformation that's reshaping global commerce. Whether you're interested in real estate, commodities, or digital assets, DMCC offers a platform for growth and innovation."
          ]
        }
      ],
      conclusion: "DMCC's evolution from a commodities trading hub to a global crypto and business centre showcases Dubai's vision for the future. As the lines between traditional and digital assets continue to blur, DMCC stands at the forefront of this transformation, offering unprecedented opportunities for forward-thinking investors and businesses."
    }
  },
  {
    id: 2,
    title: "Best Areas to Invest in Dubai 2025: Dubai South Tops the List",
    excerpt: "Why Dubai? A Global Investment Magnet Dubai has certainly established its reputation as one of the most d...",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80",
    author: {
      name: "Tallal Khan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tallal",
      initials: "TK",
      bio: "Dubai property market analyst focusing on emerging investment opportunities and growth areas."
    },
    date: "October 10, 2025",
    readTime: "7 min read",
    category: "Investment Guide"
  },
  {
    id: 3,
    title: "Why 2025 Is the Perfect Year for Singaporean Investors to Back Dubai",
    excerpt: "Dubai's growth is hard to ignore. It has quickly become one of the top places to live and invest in the world...",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&q=80",
    author: {
      name: "Muhammad Shahbaz Khan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Muhammad",
      initials: "MSK",
      bio: "Real estate investment expert with over 10 years of experience in Dubai's property market."
    },
    date: "August 28, 2025",
    readTime: "6 min read",
    category: "International Investment"
  }
];
const BlogPost = () => {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === Number(id)) || blogPosts[0];
  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 2);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("article", { className: "flex-1", children: [
      /* @__PURE__ */ jsx("div", { className: "relative bg-gradient-to-br from-primary/10 via-background to-accent/10 py-12 md:py-16", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 md:px-12 lg:px-16 xl:px-24", children: [
        /* @__PURE__ */ jsxs(Link, { to: "/blog", className: "inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 group", children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" }),
          "Back to Blog"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "max-w-4xl", children: [
          /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx("span", { className: "bg-primary/90 backdrop-blur-sm text-primary-foreground px-4 py-1.5 rounded-full text-sm font-medium", children: post.category }) }),
          /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight", children: post.title }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-4 md:gap-6 text-sm text-muted-foreground mb-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { children: post.date })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Clock, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { children: post.readTime })
            ] }),
            /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "sm", className: "gap-2", children: [
              /* @__PURE__ */ jsx(Share2, { className: "h-4 w-4" }),
              "Share"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxs(Avatar, { className: "h-14 w-14 border-2 border-primary/20", children: [
              /* @__PURE__ */ jsx(AvatarImage, { src: post.author.avatar, alt: post.author.name }),
              /* @__PURE__ */ jsx(AvatarFallback, { className: "bg-primary/10 text-primary font-semibold", children: post.author.initials })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-semibold text-foreground", children: post.author.name }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Investment Expert" })
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "relative sm:w-full md:h-[400px] lg:h-[500px] overflow-hidden px-[28px] sm:px-[97px] ", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: post.image,
          alt: post.title,
          className: "object-cover rounded-md w-[700px] h-[] sm:h-[100%] sm:w-[100%]"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 md:px-12 lg:px-16 xl:px-24 py-12 md:py-16", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
        post.content && /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
          /* @__PURE__ */ jsx("p", { className: "text-lg md:text-xl leading-relaxed text-foreground/90", children: post.content.intro }),
          /* @__PURE__ */ jsx(Separator, { className: "my-8" }),
          post.content.sections.map((section, index) => /* @__PURE__ */ jsxs("section", { className: "space-y-6 scroll-mt-24", id: `section-${index}`, children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-foreground", children: section.heading }),
              section.subheading && /* @__PURE__ */ jsx("h3", { className: "text-xl md:text-2xl font-semibold text-muted-foreground", children: section.subheading })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "space-y-4", children: section.paragraphs.map((paragraph, pIndex) => /* @__PURE__ */ jsx("p", { className: "text-base md:text-lg leading-relaxed text-foreground/80", children: paragraph }, pIndex)) }),
            index < post.content.sections.length - 1 && /* @__PURE__ */ jsx(Separator, { className: "my-8" })
          ] }, index)),
          /* @__PURE__ */ jsxs("div", { className: "bg-muted/50 rounded-lg p-6 md:p-8 border border-border/50 space-y-4", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-foreground", children: "Final Thoughts" }),
            /* @__PURE__ */ jsx("p", { className: "text-base md:text-lg leading-relaxed text-foreground/80", children: post.content.conclusion })
          ] })
        ] }),
        /* @__PURE__ */ jsx(Card, { className: "mt-12 border-2 border-primary/10", children: /* @__PURE__ */ jsx(CardContent, { className: "p-6 md:p-8", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-6", children: [
          /* @__PURE__ */ jsxs(Avatar, { className: "h-20 w-20 border-2 border-primary/20", children: [
            /* @__PURE__ */ jsx(AvatarImage, { src: post.author.avatar, alt: post.author.name }),
            /* @__PURE__ */ jsx(AvatarFallback, { className: "bg-primary/10 text-primary text-lg font-semibold", children: post.author.initials })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-2", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-foreground", children: [
              "About ",
              post.author.name
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: post.author.bio })
          ] })
        ] }) }) })
      ] }) }),
      relatedPosts.length > 0 && /* @__PURE__ */ jsx("section", { className: "bg-muted/30 py-12 md:py-16", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 md:px-12 lg:px-16 xl:px-24", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold mb-8", children: "Related Articles" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl", children: relatedPosts.map((relatedPost) => /* @__PURE__ */ jsxs(Card, { className: "group overflow-hidden hover:shadow-xl transition-all duration-300", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden aspect-[16/10]", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: relatedPost.image,
                alt: relatedPost.title,
                className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute top-4 left-4", children: /* @__PURE__ */ jsx("span", { className: "bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1 rounded-full text-xs font-medium", children: relatedPost.category }) })
          ] }),
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2", children: relatedPost.title }) }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground line-clamp-2", children: relatedPost.excerpt }) }),
          /* @__PURE__ */ jsxs(CardFooter, { className: "flex items-center justify-between pt-4 border-t", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsx(Clock, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { children: relatedPost.readTime })
            ] }),
            /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", className: "group/btn", asChild: true, children: /* @__PURE__ */ jsxs(Link, { to: `/blog/${relatedPost.id}`, children: [
              "Read More",
              /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" })
            ] }) })
          ] })
        ] }, relatedPost.id)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] }) });
};
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      className: cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ref,
      ...props
    }
  );
});
Textarea.displayName = "Textarea";
const AlHaseenResidences = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    country: "",
    budget: "",
    message: ""
  });
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    toast$1.success("Thank you! Our investment advisor will contact you shortly.");
    setFormData({ fullName: "", email: "", country: "", budget: "", message: "" });
  };
  const scrollToConsultation = () => {
    var _a;
    (_a = document.getElementById("consultation")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Sky Elite Real Estate | Dubai Property Investment & Luxury Real Estate" }),
      /* @__PURE__ */ jsx("link", { rel: "icon", href: "/favicon.png" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Invest in Dubai's premium real estate with Sky Elite. Off-plan properties, ready investments, and luxury villas with guaranteed returns. RERA-backed, tax-efficient long-term partnerships for global investors."
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "keywords",
          content: "Dubai real estate, property investment Dubai, luxury villas Dubai, off-plan properties, EMAAR properties, DAMAC properties, real estate investment, Dubai apartments"
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "author", content: "Sky Elite Real Estate" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Luxurious 3-Bedroom Apartment in Downtown Dubai" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:description",
          content: "Connecting global investors to Dubai's performance-driven properties. Structured, tax-efficient, RERA-backed investments with guaranteed returns."
        }
      ),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: "https://elite-real-estate-five.vercel.app/?v=2" }),
      /* @__PURE__ */ jsx("meta", { property: "og:image", content: "https://elite-real-estate-five.vercel.app/share-image.jpg?v=2" }),
      /* @__PURE__ */ jsx("meta", { property: "og:image:width", content: "1200" }),
      /* @__PURE__ */ jsx("meta", { property: "og:image:height", content: "630" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: "Sky Elite Real Estate | Dubai Property Investment" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "twitter:description",
          content: "Premium Dubai real estate investments with guaranteed returns. Off-plan properties and luxury villas."
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: "https://elite-real-estate-five.vercel.app/share-image.jpg?v=2" }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://elite-real-estate-five.vercel.app/?v=2" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
      /* @__PURE__ */ jsx(Navbar, {}),
      /* @__PURE__ */ jsxs("section", { className: "relative bg-gradient-to-br from-primary via-primary to-secondary py-20 md:py-32 text-white overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" }),
        /* @__PURE__ */ jsx("div", { className: "container relative mx-auto px-6 md:px-12 lg:px-16 xl:px-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-4xl text-center", children: [
          /* @__PURE__ */ jsxs(Badge, { className: "mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30", children: [
            /* @__PURE__ */ jsx(Sparkles, { className: "h-3 w-3 mr-1" }),
            "Al Haseen Residences by Dugasta Properties"
          ] }),
          /* @__PURE__ */ jsx("h1", { className: "mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl", children: "Off-Plan Investments Built on Compliance, Backed by Real Returns You Trust" }),
          /* @__PURE__ */ jsx("p", { className: "mb-8 text-lg md:text-xl text-white/90 max-w-3xl mx-auto", children: "Invest smarter, not harder. Explore Dubai's verified off-plan opportunities offering up to 10% Net ROI for 10 years. Fully escrow-protected, with zero maintenance or service fees." }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-3xl mx-auto", children: [
            { icon: Shield, text: "RERA-Approved Developer" },
            { icon: FileCheck, text: "Escrow-Protected Project" },
            { icon: Percent, text: "Tax-Efficient Investment" },
            { icon: Award, text: "Golden Visa Eligibility" }
          ].map((item, index) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20", children: [
            /* @__PURE__ */ jsx(item.icon, { className: "h-6 w-6" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs md:text-sm text-center", children: item.text })
          ] }, index)) }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
            /* @__PURE__ */ jsxs(
              Button,
              {
                size: "lg",
                onClick: scrollToConsultation,
                className: "bg-white text-primary hover:bg-white/90 text-base font-semibold",
                children: [
                  /* @__PURE__ */ jsx(Phone, { className: "h-5 w-5" }),
                  "Book Free ROI Consultation"
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              Button,
              {
                size: "lg",
                variant: "outline",
                className: "bg-transparent border-2 border-white text-white hover:bg-white/10 text-base font-semibold",
                onClick: () => window.open("https://wa.me/971588273634", "_blank"),
                children: [
                  /* @__PURE__ */ jsx(MessageCircle, { className: "h-5 w-5" }),
                  "Chat On WhatsApp"
                ]
              }
            )
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "py-16 md:py-24 bg-muted/30", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 md:px-12 lg:px-16 xl:px-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl font-bold text-center md:text-4xl text-primary", children: "Where Compliance Meets Performance" }),
        /* @__PURE__ */ jsx("p", { className: "mb-12 text-center text-lg text-muted-foreground max-w-3xl mx-auto", children: "At Sky Elite Real Estate, we guide investors toward verified ROI. Our advisory model filters out speculative projects and focuses on compliance-backed, escrow-secured investments that deliver consistent, long-term gains." }),
        /* @__PURE__ */ jsx("div", { className: "grid gap-8 md:grid-cols-3", children: [
          {
            icon: TrendingUp,
            title: "Foresight-Structured Consulting",
            description: "Personalized investment strategy aligned with your capital goals through the Sky Elite Foresight Framework."
          },
          {
            icon: CheckCircle2,
            title: "Verified ROI",
            description: "Developer-audited and escrow-linked. Every return is backed by contractual agreements."
          },
          {
            icon: FileCheck,
            title: "Complete Transparency",
            description: "No hidden fees or vague promises. Clear, verified numbers from day one."
          }
        ].map((item, index) => /* @__PURE__ */ jsx(Card, { className: "border-none shadow-lg hover:shadow-xl transition-shadow", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-8 text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary", children: /* @__PURE__ */ jsx(item.icon, { className: "h-8 w-8 text-white" }) }),
          /* @__PURE__ */ jsx("h3", { className: "mb-3 text-xl font-bold text-primary", children: item.title }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: item.description })
        ] }) }, index)) })
      ] }) }) }),
      /* @__PURE__ */ jsx("section", { className: "py-16 md:py-24", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 md:px-12 lg:px-16 xl:px-24", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs(Badge, { className: "bg-secondary text-white", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "h-3 w-3 mr-1" }),
            "Dubai Industrial City"
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold md:text-5xl text-primary leading-tight", children: "Dubai's Next Growth Zone" }),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold text-foreground", children: "Off-Plan Apartments By Dugasta Properties" }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground leading-relaxed", children: "Strategically located in Dubai Industrial City, minutes away from Al Maktoum International Airport and Dubai South, this off-plan property is built for investors seeking stability and value appreciation." }),
          /* @__PURE__ */ jsxs(Button, { size: "lg", onClick: scrollToConsultation, className: "mt-4", children: [
            /* @__PURE__ */ jsx(Phone, { className: "h-5 w-5" }),
            "Book Free ROI Consultation"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-2 border-primary/20 shadow-2xl", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "text-center space-y-4 p-8", children: [
              /* @__PURE__ */ jsx(Building2, { className: "h-24 w-24 mx-auto text-primary/30" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground font-medium", children: "Premium Property Visual" })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full" }),
            /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-secondary/20 to-transparent rounded-tr-full" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "absolute -bottom-6 -left-6 bg-white dark:bg-background border-2 border-primary/20 rounded-2xl p-4 shadow-xl", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "h-12 w-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center", children: /* @__PURE__ */ jsx(Award, { className: "h-6 w-6 text-white" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "RERA Approved" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-primary", children: "Verified Project" })
            ] })
          ] }) })
        ] })
      ] }) }) }) }),
      /* @__PURE__ */ jsx("section", { className: "py-16 md:py-24 bg-gradient-to-br from-primary/5 to-secondary/5", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 md:px-12 lg:px-16 xl:px-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl font-bold text-center md:text-4xl text-primary", children: "Investment Advantages" }),
        /* @__PURE__ */ jsx("p", { className: "mb-12 text-center text-xl text-muted-foreground", children: "Numbers That Speak for Themselves" }),
        /* @__PURE__ */ jsx("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-4", children: [
          {
            icon: Percent,
            title: "10% Net ROI",
            description: "Fixed annual return for 10 years.",
            highlight: true
          },
          {
            icon: DollarSign,
            title: "Zero Service Charges",
            description: "No deductions, full yield retained.",
            highlight: true
          },
          {
            icon: Home,
            title: "No Maintenance Fee",
            description: "Zero maintenance fee on the property.",
            highlight: false
          },
          {
            icon: Users,
            title: "Fully Managed Property",
            description: "Developer-run management.",
            highlight: false
          }
        ].map((item, index) => /* @__PURE__ */ jsx(
          Card,
          {
            className: `border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 ${item.highlight ? "bg-gradient-to-br from-primary to-secondary text-white" : "bg-white"}`,
            children: /* @__PURE__ */ jsxs(CardContent, { className: "p-6", children: [
              /* @__PURE__ */ jsx("div", { className: `mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full ${item.highlight ? "bg-white/20" : "bg-gradient-to-br from-primary to-secondary"}`, children: /* @__PURE__ */ jsx(item.icon, { className: `h-6 w-6 ${item.highlight ? "text-white" : "text-white"}` }) }),
              /* @__PURE__ */ jsx("h3", { className: `mb-2 text-xl font-bold ${item.highlight ? "text-white" : "text-primary"}`, children: item.title }),
              /* @__PURE__ */ jsx("p", { className: item.highlight ? "text-white/90" : "text-muted-foreground", children: item.description })
            ] })
          },
          index
        )) }),
        /* @__PURE__ */ jsx("div", { className: "text-center mt-10", children: /* @__PURE__ */ jsxs(Button, { size: "lg", onClick: scrollToConsultation, children: [
          /* @__PURE__ */ jsx(Phone, { className: "h-5 w-5" }),
          "Book Free ROI Consultation"
        ] }) })
      ] }) }) }),
      /* @__PURE__ */ jsx("section", { className: "py-16 md:py-24", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 md:px-12 lg:px-16 xl:px-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl font-bold text-center md:text-4xl text-primary", children: "How It Works" }),
        /* @__PURE__ */ jsx("p", { className: "mb-12 text-center text-xl text-muted-foreground", children: "A Simplified, Data-Backed Investment Journey" }),
        /* @__PURE__ */ jsx("div", { className: "grid gap-8 md:grid-cols-3", children: [
          {
            step: "01",
            title: "Consultation & Strategy",
            description: "Align your ROI expectations with verified projects.",
            icon: Phone
          },
          {
            step: "02",
            title: "Compliance & Contracting",
            description: "All transactions pass through RERA-regulated escrow accounts.",
            icon: FileCheck
          },
          {
            step: "03",
            title: "Completion & ROI Delivery",
            description: "Receive your property managed, tenanted, and yielding from day one.",
            icon: TrendingUp
          }
        ].map((item, index) => /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(Card, { className: "border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-2xl font-bold text-white", children: item.step }),
              /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10", children: /* @__PURE__ */ jsx(item.icon, { className: "h-6 w-6 text-secondary" }) })
            ] }),
            /* @__PURE__ */ jsx("h3", { className: "mb-3 text-xl font-bold text-primary", children: item.title }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: item.description })
          ] }) }),
          index < 2 && /* @__PURE__ */ jsx("div", { className: "hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-secondary" })
        ] }, index)) }),
        /* @__PURE__ */ jsx("div", { className: "text-center mt-10", children: /* @__PURE__ */ jsxs(Button, { size: "lg", onClick: scrollToConsultation, children: [
          /* @__PURE__ */ jsx(Phone, { className: "h-5 w-5" }),
          "Book Free ROI Consultation"
        ] }) })
      ] }) }) }),
      /* @__PURE__ */ jsx("section", { className: "py-16 md:py-24 bg-muted/30", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 md:px-12 lg:px-16 xl:px-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl font-bold text-center md:text-4xl text-primary", children: "Project Highlights" }),
        /* @__PURE__ */ jsx("p", { className: "mb-12 text-center text-xl text-muted-foreground", children: "Built for Investors, Designed for End-Users" }),
        /* @__PURE__ */ jsx("div", { className: "grid gap-8 md:grid-cols-3", children: [
          {
            title: "Residences",
            icon: Home,
            features: [
              "7 Studio Layouts",
              "Built-in Appliances",
              "Private Balconies",
              "Modern Finishes"
            ]
          },
          {
            title: "Investment Edge",
            icon: TrendingUp,
            features: [
              "Zero Service Fee",
              "Escrow Protected",
              "Rental Management Ready",
              "10-Year ROI Guarantee"
            ]
          },
          {
            title: "Amenities",
            icon: Building2,
            features: [
              "Infinity Pool",
              "Modern Gym",
              "Covered Parking",
              "24/7 Security"
            ]
          }
        ].map((item, index) => /* @__PURE__ */ jsx(Card, { className: "border-none shadow-lg hover:shadow-xl transition-shadow", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-8", children: [
          /* @__PURE__ */ jsx("div", { className: "mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary", children: /* @__PURE__ */ jsx(item.icon, { className: "h-7 w-7 text-white" }) }),
          /* @__PURE__ */ jsx("h3", { className: "mb-4 text-2xl font-bold text-primary", children: item.title }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: item.features.map((feature, idx) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsx(CheckCircle2, { className: "h-5 w-5 text-secondary mt-0.5 flex-shrink-0" }),
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: feature })
          ] }, idx)) })
        ] }) }, index)) })
      ] }) }) }),
      /* @__PURE__ */ jsx("section", { id: "consultation", className: "py-16 md:py-24 bg-gradient-to-br from-primary via-primary to-secondary", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 md:px-12 lg:px-16 xl:px-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-4xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center text-white mb-12", children: [
          /* @__PURE__ */ jsxs(Badge, { className: "mb-4 bg-white/20 text-white border-white/30", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "h-3 w-3 mr-1" }),
            "Book Your Consultation"
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl font-bold md:text-4xl", children: "Your Investment Clarity Starts Here" }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-white/90", children: "Opportunities like these move fast. Let's discuss your investment goals before this project sells out." })
        ] }),
        /* @__PURE__ */ jsx(Card, { className: "border-none shadow-2xl", children: /* @__PURE__ */ jsx(CardContent, { className: "p-8 md:p-12", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "fullName", className: "block mb-2 text-sm font-medium text-foreground", children: "Full Name *" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "fullName",
                  type: "text",
                  required: true,
                  value: formData.fullName,
                  onChange: (e) => setFormData({ ...formData, fullName: e.target.value }),
                  placeholder: "John Doe",
                  className: "h-12"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "block mb-2 text-sm font-medium text-foreground", children: "Email Address *" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "email",
                  type: "email",
                  required: true,
                  value: formData.email,
                  onChange: (e) => setFormData({ ...formData, email: e.target.value }),
                  placeholder: "john@example.com",
                  className: "h-12"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "country", className: "block mb-2 text-sm font-medium text-foreground", children: "Country *" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "country",
                  type: "text",
                  required: true,
                  value: formData.country,
                  onChange: (e) => setFormData({ ...formData, country: e.target.value }),
                  placeholder: "United Arab Emirates",
                  className: "h-12"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "budget", className: "block mb-2 text-sm font-medium text-foreground", children: "Investment Budget *" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "budget",
                  type: "text",
                  required: true,
                  value: formData.budget,
                  onChange: (e) => setFormData({ ...formData, budget: e.target.value }),
                  placeholder: "AED 500,000 - 1,000,000",
                  className: "h-12"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "message", className: "block mb-2 text-sm font-medium text-foreground", children: "Message" }),
            /* @__PURE__ */ jsx(
              Textarea,
              {
                id: "message",
                value: formData.message,
                onChange: (e) => setFormData({ ...formData, message: e.target.value }),
                placeholder: "Tell us about your investment goals...",
                className: "min-h-[120px]"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(
            Button,
            {
              type: "submit",
              size: "lg",
              className: "w-full bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 text-base font-semibold",
              children: [
                /* @__PURE__ */ jsx(Phone, { className: "h-5 w-5" }),
                "Send My Investment Brief"
              ]
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "text-center text-sm text-muted-foreground", children: "By submitting, you agree to receive investment updates from Sky Elite Real Estate" })
        ] }) }) })
      ] }) }) }),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
};
const NotFound = () => {
  const location = useLocation();
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "mb-4 text-4xl font-bold", children: "404" }),
    /* @__PURE__ */ jsx("p", { className: "mb-4 text-xl text-gray-600", children: "Oops! Page not found" }),
    /* @__PURE__ */ jsx("a", { href: "/", className: "text-blue-500 underline hover:text-blue-700", children: "Return to Home" })
  ] }) });
};
function Secondary() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Secondary Properties" }),
      /* @__PURE__ */ jsx("link", { rel: "icon", href: "/favicon.png" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Invest in Dubai's premium real estate with Sky Elite. Off-plan properties, ready investments, and luxury villas with guaranteed returns. RERA-backed, tax-efficient long-term partnerships for global investors."
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "keywords",
          content: "Dubai real estate, property investment Dubai, luxury villas Dubai, off-plan properties, EMAAR properties, DAMAC properties, real estate investment, Dubai apartments"
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "author", content: "Sky Elite Real Estate" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Luxurious 3-Bedroom Apartment in Downtown Dubai" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:description",
          content: "Connecting global investors to Dubai's performance-driven properties. Structured, tax-efficient, RERA-backed investments with guaranteed returns."
        }
      ),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: "https://elite-real-estate-five.vercel.app/?v=2" }),
      /* @__PURE__ */ jsx("meta", { property: "og:image", content: "https://elite-real-estate-five.vercel.app/Thumbnail.jpg?v=2" }),
      /* @__PURE__ */ jsx("meta", { property: "og:image:width", content: "1200" }),
      /* @__PURE__ */ jsx("meta", { property: "og:image:height", content: "630" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: "Sky Elite Real Estate | Dubai Property Investment" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "twitter:description",
          content: "Premium Dubai real estate investments with guaranteed returns. Off-plan properties and luxury villas."
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: "https://elite-real-estate-five.vercel.app/Thumbnail.jpg?v=2" }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://elite-real-estate-five.vercel.app/?v=2" })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Navbar, {}),
      /* @__PURE__ */ jsx(SecondaryPropertiesHero$1, {}),
      /* @__PURE__ */ jsx(PropertySearchForm$1, {}),
      /* @__PURE__ */ jsx(Property, {}),
      /* @__PURE__ */ jsx(PartnersSection$1, {}),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
}
function SecondaryPropertiesHero$1() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    category: "Buy",
    currency: "$",
    budgetMin: "",
    budgetMax: "",
    message: ""
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted successfully!");
    setIsPopupOpen(false);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "section",
      {
        className: "relative py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-accent/10",
        children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-[25px] sm:px-4 md:px-[90px]", children: /* @__PURE__ */ jsxs("div", { className: "text-white relative z-[1] max-w-[650px] ", children: [
          /* @__PURE__ */ jsx("span", { className: "mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary", children: "Services" }),
          /* @__PURE__ */ jsx("h1", { className: "mb-6 text-4xl font-bold text-foreground md:text-5xl lg:text-6xl", children: "Secondary Properties" }),
          /* @__PURE__ */ jsx("p", { className: "mb-8 text-lg text-muted-foreground md:text-xl", children: "Find your dream home easily. Whether you're upgrading, relocating, or investing, we help you secure the perfect property without the hassle." }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setIsPopupOpen(true),
              className: "mt-6 px-5 py-3 bg-[#2a416f] hover:bg-[#35528d] text-white rounded-lg transition-all",
              children: "Get Expert Advice"
            }
          )
        ] }) })
      }
    ),
    isPopupOpen && /* @__PURE__ */ jsx(
      "div",
      {
        className: `fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 transition-all duration-500 ${isPopupOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`,
        children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg w-[90%] max-w-[650px] h-[530px] mt-10 flex flex-col md:flex-row relative shadow-lg transition-all duration-500 transform animate-slideDown p-2", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setIsPopupOpen(false),
              className: "absolute top-2 right-3 text-gray-600 hover:text-gray-800 text-3xl font-light z-10",
              children: "×"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "hidden md:block md:w-1/2 h-full", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: "https://skyeliterealestate.com/assets/images/home/Mask%20group.png",
              alt: "House",
              className: "w-full h-full object-cover rounded-l-lg"
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "w-full md:w-1/2 p-4 flex flex-col justify-between h-full", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-2 text-gray-800 text-center", children: "Let's Connect!" }),
            /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-2 flex-1 flex flex-col justify-between", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    name: "fullName",
                    value: formData.fullName,
                    onChange: handleInputChange,
                    placeholder: "Full Name",
                    required: true,
                    className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "email",
                    name: "email",
                    value: formData.email,
                    onChange: handleInputChange,
                    placeholder: "Email Address",
                    required: true,
                    className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "tel",
                    name: "phoneNumber",
                    value: formData.phoneNumber,
                    onChange: handleInputChange,
                    placeholder: "Phone Number",
                    required: true,
                    className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                  }
                ),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h5", { className: "text-gray-700 font-semibold mb-1", children: "Budget Range" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex gap-2 flex-wrap", children: [
                    /* @__PURE__ */ jsxs(
                      "select",
                      {
                        name: "currency",
                        value: formData.currency,
                        onChange: handleInputChange,
                        className: "flex-[0_0_90px] px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none",
                        children: [
                          /* @__PURE__ */ jsx("option", { value: "$", children: "USD" }),
                          /* @__PURE__ */ jsx("option", { value: "AED", children: "AED" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "number",
                        name: "budgetMin",
                        value: formData.budgetMin,
                        onChange: handleInputChange,
                        placeholder: "Min",
                        min: "0",
                        required: true,
                        className: "flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "number",
                        name: "budgetMax",
                        value: formData.budgetMax,
                        onChange: handleInputChange,
                        placeholder: "Max",
                        min: "0",
                        required: true,
                        className: "flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    name: "message",
                    value: formData.message,
                    onChange: handleInputChange,
                    placeholder: "Type your message...",
                    className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 resize-none outline-none"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  className: "w-full bg-[#1FA7E1] text-white py-3 rounded-md hover:bg-[#1890c9] transition-all mt-2",
                  children: "Submit"
                }
              )
            ] })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx("style", { children: `
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown {
          animation: slideDown 0.4s ease-out;
        }
      ` })
  ] });
}
function PropertySearchForm$1() {
  React__default.useState("");
  React__default.useState("");
  React__default.useState("");
  React__default.useState("");
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("section", { className: "border-b border-border/40 bg-background/95 backdrop-blur", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 md:px-12 lg:px-16 xl:px-24 py-8", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-5 items-end", children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-foreground", children: "Select City" }),
      /* @__PURE__ */ jsxs(Select, { defaultValue: "dubai", children: [
        /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select city" }) }),
        /* @__PURE__ */ jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsx(SelectItem, { value: "dubai", children: "Dubai" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "abu-dhabi", children: "Abu Dhabi" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "sharjah", children: "Sharjah" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-foreground", children: "Property Type" }),
      /* @__PURE__ */ jsxs(Select, { defaultValue: "apartment", children: [
        /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Choose property" }) }),
        /* @__PURE__ */ jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsx(SelectItem, { value: "apartment", children: "Apartment" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "villa", children: "Villa" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "townhouse", children: "Townhouse" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-foreground", children: "Bedrooms" }),
      /* @__PURE__ */ jsxs(Select, { children: [
        /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Choose bedroom" }) }),
        /* @__PURE__ */ jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsx(SelectItem, { value: "studio", children: "Studio" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "1", children: "1 Bedroom" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "2", children: "2 Bedrooms" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "3", children: "3 Bedrooms" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "4+", children: "4+ Bedrooms" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-foreground", children: "Price Range" }),
      /* @__PURE__ */ jsxs(Select, { children: [
        /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Price" }) }),
        /* @__PURE__ */ jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsx(SelectItem, { value: "0-500k", children: "AED 0 - 500k" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "500k-1m", children: "AED 500k - 1M" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "1m-2m", children: "AED 1M - 2M" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "2m+", children: "AED 2M+" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Button, { className: "gap-2", children: [
      /* @__PURE__ */ jsx("search", { className: "h-4 w-4" }),
      "Search"
    ] })
  ] }) }) }) });
}
const Property = () => {
  useState(false);
  const offPlanProperties2 = [
    {
      id: "1",
      title: "Stylish Studio in Al Haseen 4",
      location: "Al Haseen-4, Dubai",
      price: "AED 379,000",
      type: "Off-Plan",
      area: "379 sq.ft",
      addedDate: "03 Sep 2025",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80"
    },
    {
      id: "2",
      title: "1 BHK in Dugasta Al Haseen 4",
      location: "Al Haseen-4, Dubai",
      price: "AED 1,427,989",
      type: "Off-Plan",
      bedrooms: 1,
      area: "650 sq.ft",
      addedDate: "03 Sep 2025",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80"
    },
    {
      id: "3",
      title: "Affordable Luxury Apartment",
      location: "Al Haseen-4, Dubai",
      price: "AED 538,888",
      type: "Off-Plan",
      bedrooms: 1,
      area: "550 sq.ft",
      addedDate: "30 Jul 2025",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"
    },
    {
      id: "4",
      title: "Premium 1 BHK with High Floor Views",
      location: "Al Haseen-4, Dubai",
      price: "AED 521,125",
      type: "Off-Plan",
      bedrooms: 1,
      area: "580 sq.ft",
      addedDate: "30 Jul 2025",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80"
    },
    {
      id: "5",
      title: "Luxury Villas Handing Over In 2029",
      location: "Selvara, Grand Polo Club & Resort, Dubai",
      price: "AED 6,286,888",
      type: "Off-Plan",
      bedrooms: 4,
      area: "3500 sq.ft",
      addedDate: "30 Jul 2025",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      featured: true
    }
  ];
  return /* @__PURE__ */ jsx("div", { className: "w-full min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8", children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("section", { className: "py-16 md:py-24 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 md:px-12 lg:px-16 xl:px-24", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-foreground md:text-3xl", children: "Apartments for Sale in Dubai" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-1", children: "Dubai South" })
      ] }),
      /* @__PURE__ */ jsxs(Select, { defaultValue: "newest", children: [
        /* @__PURE__ */ jsx(SelectTrigger, { className: "w-[180px]", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Sort by" }) }),
        /* @__PURE__ */ jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsx(SelectItem, { value: "newest", children: "Newest" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "price-low", children: "Price: Low to High" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "price-high", children: "Price: High to Low" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "area", children: "Area: Largest" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: offPlanProperties2.map((property) => /* @__PURE__ */ jsx(PropertyCard, { ...property }, property.id)) })
  ] }) }) }) });
};
function PartnersSection$1() {
  const trackRef = useRef(null);
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let position = 0;
    const speed = 0.4;
    const logos2 = track.children.length;
    const logoWidth = 150;
    const totalWidth = logos2 * logoWidth;
    const animate = () => {
      position -= speed;
      if (Math.abs(position) >= totalWidth / 2) {
        position = 0;
      }
      track.style.transform = `translateX(${position}px)`;
      requestAnimationFrame(animate);
    };
    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);
  const logos = [
    "https://skyeliterealestate.com/assets/images/OffPlan/Logo-1.png",
    "https://skyeliterealestate.com/assets/images/OffPlan/Logo-4.png",
    "https://skyeliterealestate.com/assets/images/OffPlan/Logo-4.png",
    "https://skyeliterealestate.com/assets/images/OffPlan/Logo-9.png",
    "https://skyeliterealestate.com/assets/images/OffPlan/Logo-5.png",
    "https://skyeliterealestate.com/assets/images/OffPlan/Logo-7.png",
    "https://skyeliterealestate.com/assets/images/OffPlan/Logo-8.png",
    "https://skyeliterealestate.com/assets/images/OffPlan/Logo-5.png",
    "https://skyeliterealestate.com/assets/images/OffPlan/Logo-9.png",
    "https://skyeliterealestate.com/assets/images/OffPlan/Logo-7.png"
  ];
  return /* @__PURE__ */ jsx("section", { className: "pt-6 sm:pt-8 md:pt-10 overflow-hidden px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-[98px] mb-6 sm:mb-8 md:mb-10", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12", children: [
    /* @__PURE__ */ jsx("div", { className: "col-span-12", children: /* @__PURE__ */ jsx("div", { className: "mb-4 sm:mb-5 md:mb-6 text-center", children: /* @__PURE__ */ jsx("h2", { className: "font-serif text-blue-900 text-xl sm:text-2xl md:text-3xl xl:text-4xl capitalize font-medium", children: "Our Partners" }) }) }),
    /* @__PURE__ */ jsx("div", { className: "col-span-12", children: /* @__PURE__ */ jsx("div", { className: "relative w-full overflow-hidden", children: /* @__PURE__ */ jsxs(
      "div",
      {
        ref: trackRef,
        className: "flex gap-4 sm:gap-6 md:gap-8 items-center w-max",
        children: [
          logos.map((logo2, index) => /* @__PURE__ */ jsx(
            "img",
            {
              src: logo2,
              alt: `Partner Logo ${index + 1}`,
              className: "h-[60px] sm:h-[80px] md:h-[100px] lg:h-[110px] w-auto object-contain flex-shrink-0"
            },
            `logo-${index}`
          )),
          logos.map((logo2, index) => /* @__PURE__ */ jsx(
            "img",
            {
              src: logo2,
              alt: `Partner Logo ${index + 1}`,
              className: "h-[60px] sm:h-[80px] md:h-[100px] lg:h-[110px] w-auto object-contain flex-shrink-0"
            },
            `logo-duplicate-${index}`
          ))
        ]
      }
    ) }) })
  ] }) }) });
}
function Testimonials() {
  const { id } = useParams();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Contact Us" }),
      /* @__PURE__ */ jsx("link", { rel: "icon", href: "/favicon.png" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Invest in Dubai's premium real estate with Sky Elite. Off-plan properties, ready investments, and luxury villas with guaranteed returns. RERA-backed, tax-efficient long-term partnerships for global investors."
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "keywords",
          content: "Dubai real estate, property investment Dubai, luxury villas Dubai, off-plan properties, EMAAR properties, DAMAC properties, real estate investment, Dubai apartments"
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "author", content: "Sky Elite Real Estate" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Luxurious 3-Bedroom Apartment in Downtown Dubai" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:description",
          content: "Connecting global investors to Dubai's performance-driven properties. Structured, tax-efficient, RERA-backed investments with guaranteed returns."
        }
      ),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: "https://elite-real-estate-five.vercel.app/?v=2" }),
      /* @__PURE__ */ jsx("meta", { property: "og:image", content: "https://elite-real-estate-five.vercel.app/share-image.jpg?v=2" }),
      /* @__PURE__ */ jsx("meta", { property: "og:image:width", content: "1200" }),
      /* @__PURE__ */ jsx("meta", { property: "og:image:height", content: "630" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: "Sky Elite Real Estate | Dubai Property Investment" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "twitter:description",
          content: "Premium Dubai real estate investments with guaranteed returns. Off-plan properties and luxury villas."
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: "https://elite-real-estate-five.vercel.app/share-image.jpg?v=2" }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://elite-real-estate-five.vercel.app/?v=2" })
    ] }),
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx(ContactForm, {}),
    /* @__PURE__ */ jsx(ContactCards, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    phoneNumber: "",
    email: "",
    message: ""
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Form submitted successfully!");
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "relative py-6 sm:py-8 lg:py-10 sm:px-6 md:px-8 lg:px-12 xl:px-[65px] 2xl:px-24 bg-cover bg-center bg-no-repeat",
      style: {
        backgroundImage: "url('https://skyeliterealestate.com/assets/images/Secondary/Hero.png')"
      },
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/20" }),
        /* @__PURE__ */ jsx("div", { className: "container relative z-[1]", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10 items-stretch", children: [
          /* @__PURE__ */ jsx("div", { className: "w-full order-2 lg:order-1", children: /* @__PURE__ */ jsxs("div", { className: "h-full bg-white p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-sm", children: [
            /* @__PURE__ */ jsx("div", { className: "mb-4 sm:mb-6", children: /* @__PURE__ */ jsx("h2", { className: "text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-left text-[#0B579C] leading-tight", children: "Get in touch with us and let's find your Perfect Property in Dubai" }) }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3 sm:space-y-4", children: [
              /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx(
                "input",
                {
                  className: "bg-white/90 text-black text-sm sm:text-base font-light w-full leading-[1] placeholder:text-black placeholder:text-sm sm:placeholder:text-base border border-[#0B579C] border-opacity-60 rounded-lg p-3 sm:p-[10px] focus:border-[#0B579C] focus:border-opacity-100 focus:outline-none focus:ring-2 focus:ring-[#0B579C] focus:ring-opacity-20 transition-all",
                  type: "text",
                  placeholder: "Full Name",
                  name: "firstName",
                  value: formData.firstName,
                  onChange: handleChange,
                  required: true
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4", children: [
                /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx(
                  "input",
                  {
                    className: "bg-white/90 text-black text-sm sm:text-base font-light w-full leading-[1] placeholder:text-black placeholder:text-sm sm:placeholder:text-base border border-[#0B579C] border-opacity-60 rounded-lg p-3 sm:p-[10px] focus:border-[#0B579C] focus:border-opacity-100 focus:outline-none focus:ring-2 focus:ring-[#0B579C] focus:ring-opacity-20 transition-all",
                    type: "tel",
                    placeholder: "Phone number",
                    name: "phoneNumber",
                    value: formData.phoneNumber,
                    onChange: handleChange
                  }
                ) }),
                /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx(
                  "input",
                  {
                    className: "bg-white/90 text-black text-sm sm:text-base font-light w-full leading-[1] placeholder:text-black placeholder:text-sm sm:placeholder:text-base border border-[#0B579C] border-opacity-60 rounded-lg p-3 sm:p-[10px] focus:border-[#0B579C] focus:border-opacity-100 focus:outline-none focus:ring-2 focus:ring-[#0B579C] focus:ring-opacity-20 transition-all",
                    type: "email",
                    placeholder: "Email Address",
                    name: "email",
                    value: formData.email,
                    onChange: handleChange
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx(
                "textarea",
                {
                  className: "bg-white/90 text-black text-sm sm:text-base h-32 sm:h-40 md:h-48 font-light w-full leading-5 placeholder:text-black placeholder:text-sm sm:placeholder:text-base border border-[#0B579C] border-opacity-60 rounded-lg p-3 sm:p-[10px] focus:border-[#0B579C] focus:border-opacity-100 focus:outline-none focus:ring-2 focus:ring-[#0B579C] focus:ring-opacity-20 resize-none transition-all",
                  name: "message",
                  value: formData.message,
                  onChange: handleChange,
                  placeholder: "Message"
                }
              ) }),
              /* @__PURE__ */ jsx("div", { className: "w-full flex items-center justify-center pt-2", children: /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: handleSubmit,
                  className: "w-full sm:w-auto relative overflow-hidden text-white font-medium text-sm sm:text-base lg:text-lg px-8 sm:px-10 lg:px-12 py-3 sm:py-[10px] rounded-lg bg-[#0B579C] hover:bg-[#084a82] active:scale-95 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg",
                  children: "Contact Us"
                }
              ) })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "w-full order-1 lg:order-2", children: /* @__PURE__ */ jsx("div", { className: "h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm", children: /* @__PURE__ */ jsx("div", { className: "w-full h-full", children: /* @__PURE__ */ jsx(
            "iframe",
            {
              className: "w-full h-full min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px]",
              frameBorder: "0",
              scrolling: "no",
              src: "https://maps.google.com/maps?width=600&height=400&hl=en&q=Armada tower JLT&t=&z=14&ie=UTF8&iwloc=B&output=embed",
              title: "Office Location Map"
            }
          ) }) }) })
        ] }) })
      ]
    }
  );
}
const ContactCards = () => {
  const contactData = [
    {
      icon: /* @__PURE__ */ jsx(HiOutlineLocationMarker, { size: 40, className: "text-primary" }),
      title: "Address",
      details: ["Armada tower JLT"]
    },
    {
      icon: /* @__PURE__ */ jsx(HiOutlinePhone, { size: 40, className: "text-primary" }),
      title: "Call us",
      details: ["0588273634", "+971588273634"]
    },
    {
      icon: /* @__PURE__ */ jsx(HiOutlineMail, { size: 40, className: "text-primary" }),
      title: "Email us",
      details: [
        { text: "Shahbaz@skyeliterealestate.com", href: "mailto:Shahbaz@skyeliterealestate.com" },
        { text: "Ashfaque@skteliterealestate.com", href: "mailto:Ashfaque@skteliterealestate.com" }
      ]
    }
  ];
  return /* @__PURE__ */ jsx("section", { className: "py-12 md:py-16 lg:py-20 xl:py-[120px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[55px]", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto max-w-7xl", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8", children: contactData.map((item, index) => /* @__PURE__ */ jsxs(
    "div",
    {
      className: "flex flex-col sm:flex-row items-start hover:drop-shadow-[0px_16px_10px_rgba(0,0,0,0.1)] hover:bg-[#F5F9F8] transition-all duration-300 p-5 md:p-6 lg:p-[20px] rounded-lg group",
      children: [
        /* @__PURE__ */ jsx("div", { className: "mb-4 sm:mb-0 sm:mr-5 md:mr-8 lg:mr-5 xl:mr-10 flex-shrink-0", children: item.icon }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-lora group-hover:text-secondary transition-colors duration-300 text-xl sm:text-2xl lg:text-[28px] text-primary mb-2 md:mb-3", children: item.title }),
          /* @__PURE__ */ jsx("div", { className: "font-light text-sm md:text-base space-y-1", children: item.details.map(
            (detail, idx) => typeof detail === "string" ? /* @__PURE__ */ jsx("p", { className: "break-words", children: detail }, idx) : /* @__PURE__ */ jsx(
              "a",
              {
                href: detail.href,
                className: "hover:text-secondary transition-colors duration-200 block break-all",
                children: detail.text
              },
              idx
            )
          ) })
        ] })
      ]
    },
    index
  )) }) }) });
};
function Rental() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Rental Properties" }),
      /* @__PURE__ */ jsx("link", { rel: "icon", href: "/favicon.png" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Invest in Dubai's premium real estate with Sky Elite. Off-plan properties, ready investments, and luxury villas with guaranteed returns. RERA-backed, tax-efficient long-term partnerships for global investors."
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "keywords",
          content: "Dubai real estate, property investment Dubai, luxury villas Dubai, off-plan properties, EMAAR properties, DAMAC properties, real estate investment, Dubai apartments"
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "author", content: "Sky Elite Real Estate" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Luxurious 3-Bedroom Apartment in Downtown Dubai" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:description",
          content: "Connecting global investors to Dubai's performance-driven properties. Structured, tax-efficient, RERA-backed investments with guaranteed returns."
        }
      ),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: "https://elite-real-estate-five.vercel.app/?v=2" }),
      /* @__PURE__ */ jsx("meta", { property: "og:image", content: "https://elite-real-estate-five.vercel.app/Thumbnail.jpg?v=2" }),
      /* @__PURE__ */ jsx("meta", { property: "og:image:width", content: "1200" }),
      /* @__PURE__ */ jsx("meta", { property: "og:image:height", content: "630" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: "Sky Elite Real Estate | Dubai Property Investment" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "twitter:description",
          content: "Premium Dubai real estate investments with guaranteed returns. Off-plan properties and luxury villas."
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: "https://elite-real-estate-five.vercel.app/Thumbnail.jpg?v=2" }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://elite-real-estate-five.vercel.app/?v=2" })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Navbar, {}),
      /* @__PURE__ */ jsx(SecondaryPropertiesHero, {}),
      /* @__PURE__ */ jsx(PropertySearchForm, {}),
      /* @__PURE__ */ jsx(ApartmentsList, {}),
      /* @__PURE__ */ jsx(PartnersSection, {}),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
}
function SecondaryPropertiesHero() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    category: "Buy",
    currency: "$",
    budgetMin: "",
    budgetMax: "",
    message: ""
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted successfully!");
    setIsPopupOpen(false);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "section",
      {
        className: "relative py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-accent/10",
        children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-[25px] sm:px-4 md:px-[90px]", children: /* @__PURE__ */ jsxs("div", { className: "text-white relative z-[1] max-w-[650px]", children: [
          /* @__PURE__ */ jsx("span", { className: "mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary", children: "Services" }),
          /* @__PURE__ */ jsx("h1", { className: "mb-6 text-4xl font-bold text-foreground md:text-5xl lg:text-6xl", children: "Rental Properties" }),
          /* @__PURE__ */ jsx("p", { className: "mb-8 text-lg text-muted-foreground md:text-xl", children: "We help you find rental properties with ease, whether you need a temporary stay, a family home, or a premium apartment." }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setIsPopupOpen(true),
              className: "mt-6 px-5 py-3 bg-[#2a416f] hover:bg-[#35528d] text-white rounded-lg transition-all",
              children: "Get Expert Advice"
            }
          )
        ] }) })
      }
    ),
    isPopupOpen && /* @__PURE__ */ jsx(
      "div",
      {
        className: `fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 transition-all duration-500 ${isPopupOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`,
        children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg w-[90%] max-w-[650px] h-[530px] mt-10 flex flex-col md:flex-row relative shadow-lg transition-all duration-500 transform animate-slideDown p-2", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setIsPopupOpen(false),
              className: "absolute top-2 right-3 text-gray-600 hover:text-gray-800 text-3xl font-light z-10",
              children: "×"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "hidden md:block md:w-1/2 h-full", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: "https://skyeliterealestate.com/assets/images/home/Mask%20group.png",
              alt: "House",
              className: "w-full h-full object-cover rounded-l-lg"
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "w-full md:w-1/2 p-4 flex flex-col justify-between h-full", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-2 text-gray-800 text-center", children: "Let's Connect!" }),
            /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-2 flex-1 flex flex-col justify-between", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    name: "fullName",
                    value: formData.fullName,
                    onChange: handleInputChange,
                    placeholder: "Full Name",
                    required: true,
                    className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "email",
                    name: "email",
                    value: formData.email,
                    onChange: handleInputChange,
                    placeholder: "Email Address",
                    required: true,
                    className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "tel",
                    name: "phoneNumber",
                    value: formData.phoneNumber,
                    onChange: handleInputChange,
                    placeholder: "Phone Number",
                    required: true,
                    className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                  }
                ),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h5", { className: "text-gray-700 font-semibold mb-1", children: "Budget Range" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex gap-2 flex-wrap", children: [
                    /* @__PURE__ */ jsxs(
                      "select",
                      {
                        name: "currency",
                        value: formData.currency,
                        onChange: handleInputChange,
                        className: "flex-[0_0_90px] px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none",
                        children: [
                          /* @__PURE__ */ jsx("option", { value: "$", children: "USD" }),
                          /* @__PURE__ */ jsx("option", { value: "AED", children: "AED" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "number",
                        name: "budgetMin",
                        value: formData.budgetMin,
                        onChange: handleInputChange,
                        placeholder: "Min",
                        min: "0",
                        required: true,
                        className: "flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "number",
                        name: "budgetMax",
                        value: formData.budgetMax,
                        onChange: handleInputChange,
                        placeholder: "Max",
                        min: "0",
                        required: true,
                        className: "flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    name: "message",
                    value: formData.message,
                    onChange: handleInputChange,
                    placeholder: "Type your message...",
                    className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 resize-none outline-none"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  className: "w-full bg-[#1FA7E1] text-white py-3 rounded-md hover:bg-[#1890c9] transition-all mt-2",
                  children: "Submit"
                }
              )
            ] })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx("style", { children: `
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown {
          animation: slideDown 0.4s ease-out;
        }
      ` })
  ] });
}
function PropertySearchForm() {
  React__default.useState("");
  React__default.useState("");
  React__default.useState("");
  React__default.useState("");
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("section", { className: "border-b border-border/40 bg-background/95 backdrop-blur", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 md:px-12 lg:px-16 xl:px-24 py-8", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-5 items-end", children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-foreground", children: "Select City" }),
      /* @__PURE__ */ jsxs(Select, { defaultValue: "dubai", children: [
        /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select city" }) }),
        /* @__PURE__ */ jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsx(SelectItem, { value: "dubai", children: "Dubai" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "abu-dhabi", children: "Abu Dhabi" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "sharjah", children: "Sharjah" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-foreground", children: "Property Type" }),
      /* @__PURE__ */ jsxs(Select, { defaultValue: "apartment", children: [
        /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Choose property" }) }),
        /* @__PURE__ */ jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsx(SelectItem, { value: "apartment", children: "Apartment" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "villa", children: "Villa" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "townhouse", children: "Townhouse" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-foreground", children: "Bedrooms" }),
      /* @__PURE__ */ jsxs(Select, { children: [
        /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Choose bedroom" }) }),
        /* @__PURE__ */ jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsx(SelectItem, { value: "studio", children: "Studio" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "1", children: "1 Bedroom" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "2", children: "2 Bedrooms" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "3", children: "3 Bedrooms" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "4+", children: "4+ Bedrooms" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-foreground", children: "Price Range" }),
      /* @__PURE__ */ jsxs(Select, { children: [
        /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Price" }) }),
        /* @__PURE__ */ jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsx(SelectItem, { value: "0-500k", children: "AED 0 - 500k" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "500k-1m", children: "AED 500k - 1M" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "1m-2m", children: "AED 1M - 2M" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "2m+", children: "AED 2M+" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Button, { className: "gap-2", children: [
      /* @__PURE__ */ jsx("search", { className: "h-4 w-4" }),
      "Search"
    ] })
  ] }) }) }) });
}
function ApartmentsList() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Property, {}) });
}
function PartnersSection() {
  const trackRef = useRef(null);
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let position = 0;
    const speed = 0.4;
    const logos2 = track.children.length;
    const logoWidth = 150;
    const totalWidth = logos2 * logoWidth;
    const animate = () => {
      position -= speed;
      if (Math.abs(position) >= totalWidth / 2) {
        position = 0;
      }
      track.style.transform = `translateX(${position}px)`;
      requestAnimationFrame(animate);
    };
    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);
  const logos = [
    "https://skyeliterealestate.com/assets/images/OffPlan/Logo-1.png",
    "https://skyeliterealestate.com/assets/images/OffPlan/Logo-4.png",
    "https://skyeliterealestate.com/assets/images/OffPlan/Logo-4.png",
    "https://skyeliterealestate.com/assets/images/OffPlan/Logo-9.png",
    "https://skyeliterealestate.com/assets/images/OffPlan/Logo-5.png",
    "https://skyeliterealestate.com/assets/images/OffPlan/Logo-7.png",
    "https://skyeliterealestate.com/assets/images/OffPlan/Logo-8.png",
    "https://skyeliterealestate.com/assets/images/OffPlan/Logo-5.png",
    "https://skyeliterealestate.com/assets/images/OffPlan/Logo-9.png",
    "https://skyeliterealestate.com/assets/images/OffPlan/Logo-7.png"
  ];
  return /* @__PURE__ */ jsx("section", { className: "pt-6 sm:pt-8 md:pt-10 overflow-hidden px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-[98px] mb-6 sm:mb-8 md:mb-10", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12", children: [
    /* @__PURE__ */ jsx("div", { className: "col-span-12", children: /* @__PURE__ */ jsx("div", { className: "mb-4 sm:mb-5 md:mb-6 text-center", children: /* @__PURE__ */ jsx("h2", { className: "font-serif text-blue-900 text-xl sm:text-2xl md:text-3xl xl:text-4xl capitalize font-medium", children: "Our Partners" }) }) }),
    /* @__PURE__ */ jsx("div", { className: "col-span-12", children: /* @__PURE__ */ jsx("div", { className: "relative w-full overflow-hidden", children: /* @__PURE__ */ jsxs(
      "div",
      {
        ref: trackRef,
        className: "flex gap-4 sm:gap-6 md:gap-8 items-center w-max",
        children: [
          logos.map((logo2, index) => /* @__PURE__ */ jsx(
            "img",
            {
              src: logo2,
              alt: `Partner Logo ${index + 1}`,
              className: "h-[60px] sm:h-[80px] md:h-[100px] lg:h-[110px] w-auto object-contain flex-shrink-0"
            },
            `logo-${index}`
          )),
          logos.map((logo2, index) => /* @__PURE__ */ jsx(
            "img",
            {
              src: logo2,
              alt: `Partner Logo ${index + 1}`,
              className: "h-[60px] sm:h-[80px] md:h-[100px] lg:h-[110px] w-auto object-contain flex-shrink-0"
            },
            `logo-duplicate-${index}`
          ))
        ]
      }
    ) }) })
  ] }) }) });
}
function PrivacyPolicy() {
  const { id } = useParams();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx(Privacy, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] }) });
}
function Privacy() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50", children: [
    /* @__PURE__ */ jsx("section", { className: "bg-gradient-to-br from-primary/10 via-background to-accent/10 text-white py-16 px-4", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto text-center", children: /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-bold text-foreground", children: "Privacy Policy" }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-12 max-w-4xl", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-foreground mb-6", children: "Our Commitment to Your Privacy" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed mb-8", children: "At our UAE-based real estate investment company, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our website or engage with our services." }),
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-semibold text-foreground mb-4 flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(Shield, { className: "text-[#2a416f]", size: 28 }),
          "1. Information We Collect"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed mb-3", children: "We collect personal information that you voluntarily provide when you:" }),
        /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside text-gray-700 space-y-2 ml-4", children: [
          /* @__PURE__ */ jsx("li", { children: "Book a consultation or request property investment advice" }),
          /* @__PURE__ */ jsx("li", { children: "Subscribe to newsletters or special offers" }),
          /* @__PURE__ */ jsx("li", { children: "List your property for resale or rental" }),
          /* @__PURE__ */ jsx("li", { children: "Contact our advisors for inquiries" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed mt-3", children: "This may include your name, phone number, email address, investment preferences, and other relevant data." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-semibold text-foreground mb-4 flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(Settings, { className: "text-[#2a416f]", size: 28 }),
          "2. How We Use Your Data"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed mb-3", children: "Your information is used to:" }),
        /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside text-gray-700 space-y-2 ml-4", children: [
          /* @__PURE__ */ jsx("li", { children: "Personalize property recommendations and consultations" }),
          /* @__PURE__ */ jsx("li", { children: "Send important updates about your investment process" }),
          /* @__PURE__ */ jsx("li", { children: "Communicate exclusive real estate opportunities" }),
          /* @__PURE__ */ jsx("li", { children: "Enhance our website and services based on user feedback" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed mt-3", children: "We do not sell or rent your personal data to any third parties." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-semibold text-foreground mb-4 flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(Share2, { className: "text-[#2a416f]", size: 28 }),
          "3. Data Sharing"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed", children: "We may share your information with trusted third-party partners such as property developers or legal teams only as required to process your investment or property ownership." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-semibold text-foreground mb-4 flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(Cookie, { className: "text-[#2a416f]", size: 28 }),
          "4. Cookies & Analytics"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed", children: "Our website uses cookies to enhance your experience. These cookies help us understand how users interact with the site and allow us to improve content, speed, and usability." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-semibold text-foreground mb-4 flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(Lock, { className: "text-[#2a416f]", size: 28 }),
          "5. Data Security"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed", children: "We take strong security measures to safeguard your data, including encryption and restricted access to authorized personnel only. Your data is stored securely and handled with utmost confidentiality." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-semibold text-foreground mb-4 flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(UserCheck, { className: "text-[#2a416f]", size: 28 }),
          "6. Your Rights"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed", children: "You have the right to access, update, or request deletion of your personal data at any time. To make such requests, please contact us via email." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-semibold text-foreground mb-4 flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(RefreshCw, { className: "text-[#2a416f]", size: 28 }),
          "7. Changes to This Policy"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed", children: "We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. Please revisit this page periodically for any updates." })
      ] })
    ] })
  ] });
}
function TermsConditions() {
  const { id } = useParams();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx(Terms, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] }) });
}
function Terms() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50", children: [
    /* @__PURE__ */ jsx("section", { className: "bg-gradient-to-br from-primary/10 via-background to-accent/10 text-foreground py-16 px-4", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto text-center", children: /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-bold", children: "Terms & Conditions" }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-12 max-w-4xl", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-foreground mb-6", children: "Welcome to Our Terms & Conditions" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed mb-8", children: "These Terms & Conditions govern your access to and use of our real estate investment platform in the UAE. By accessing our site, booking a consultation, or investing through us, you agree to these terms." }),
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-[#2a416f] mb-4", children: "1. Services We Provide" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed", children: "We offer professional consulting and support services for investment in off-plan, secondary, and rental properties across the UAE. Our featured project, StudioX Apartments in Dubai Industrial City by Dugasta Properties, comes with a guaranteed 10% net ROI for 10 years." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-[#2a416f] mb-4", children: "2. Investment Disclaimer" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed", children: "Real estate investments carry inherent risks. While we provide expert guidance and support throughout the process, we do not offer any financial guarantees beyond what is contractually provided by the property developers. Always perform due diligence before committing." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-[#2a416f] mb-4", children: "3. Consultation & Booking" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed", children: "By booking a consultation, you consent to being contacted by our advisors for investment-related discussions. We prioritize personalized assistance based on your goals and preferences." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-[#2a416f] mb-4", children: "4. StudioX Specific Terms" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed", children: "StudioX apartments are marketed with high-yield returns, flexible payment plans, and no maintenance fees. Full legal guidance is provided for contracts and ownership transfers. Ensure you read and understand the offer document and payment schedule before investing." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-[#2a416f] mb-4", children: "5. Ownership & Listings" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed", children: "If you choose to list your property with us, your ownership details and contact information may be used for listing and resale purposes as authorized by you." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-[#2a416f] mb-4", children: "6. Intellectual Property" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed", children: "All branding, website content, images, and marketing materials are owned by our company and may not be reproduced without permission." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-[#2a416f] mb-4", children: "7. Privacy & Data Use" }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-700 leading-relaxed", children: [
          "Your privacy is important to us. We collect personal data only to enhance your experience and will never sell or share your information without consent. Please refer to our",
          " ",
          /* @__PURE__ */ jsx("a", { href: "privacy.html", className: "text-blue-600 hover:text-blue-800 underline", children: "Privacy Policy" }),
          " ",
          "for more."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-[#2a416f] mb-4", children: "8. Limitation of Liability" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed", children: 'We are not responsible for any loss, damages, or consequences resulting from decisions made based on information provided through our platform. All services are provided "as-is."' })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-[#2a416f] mb-4", children: "9. Changes to Terms" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed", children: "We reserve the right to modify these Terms at any time. Updates will be reflected on this page. Continued use of the site implies your acceptance of these updates." })
      ] })
    ] })
  ] });
}
const queryClient = new QueryClient();
const App = () => /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxs(TooltipProvider, { children: [
  /* @__PURE__ */ jsx(Toaster$1, {}),
  /* @__PURE__ */ jsx(Toaster, {}),
  /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Index, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/about", element: /* @__PURE__ */ jsx(AboutUs, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/off-plan", element: /* @__PURE__ */ jsx(OffPlan, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/property/:id", element: /* @__PURE__ */ jsx(PropertyDetails$1, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/blog", element: /* @__PURE__ */ jsx(PropertyDetails, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/blog/:id", element: /* @__PURE__ */ jsx(BlogPost, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/al-haseen-residences", element: /* @__PURE__ */ jsx(AlHaseenResidences, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/secondary", element: /* @__PURE__ */ jsx(Secondary, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/Testimonials", element: /* @__PURE__ */ jsx(Testimonials, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/rental", element: /* @__PURE__ */ jsx(Rental, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/privacypolicy", element: /* @__PURE__ */ jsx(PrivacyPolicy, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/termsconditions", element: /* @__PURE__ */ jsx(TermsConditions, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(NotFound, {}) })
  ] })
] }) });
createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsx(HelmetProvider, { children: /* @__PURE__ */ jsx(BrowserRouter, { children: /* @__PURE__ */ jsx(App, {}) }) })
);
