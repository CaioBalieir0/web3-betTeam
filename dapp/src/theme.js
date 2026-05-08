import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      900: "#0D0E1A",
      800: "#13142A",
      700: "#1E1F3A",
      500: "#7C3AED",
      400: "#3B82F6",
    },
  },
  styles: {
    global: {
      body: {
        bg: "#0D0E1A",
        color: "white",
        fontFamily: "var(--font-geist-sans), sans-serif",
      },
    },
  },
  components: {
    Button: {
      variants: {
        brand: {
          bgGradient: "linear(to-r, #7C3AED, #3B82F6)",
          color: "white",
          fontWeight: "bold",
          _hover: {
            bgGradient: "linear(to-r, #6D28D9, #2563EB)",
            boxShadow: "0 0 20px rgba(124,58,237,0.5)",
            transform: "translateY(-1px)",
          },
          _active: {
            transform: "translateY(0)",
          },
        },
      },
    },
  },
});

export default theme;
