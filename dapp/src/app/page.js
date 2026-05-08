"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { doLogin } from "@/services/Web3Services";

export default function Home() {
  const { push } = useRouter();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const btnLoginClick = () => {
    setIsLoading(true);
    doLogin()
      .then(() => push("/bet"))
      .catch((err) => {
        console.error(err);
        setMessage(err.message);
        setIsLoading(false);
      });
  };

  return (
    <Box
      minH="100vh"
      bg="#0D0E1A"
      position="relative"
      overflow="hidden"
    >
      {/* Gradiente radial de fundo */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        w="600px"
        h="600px"
        borderRadius="full"
        background="radial-gradient(ellipse at center, rgba(124,58,237,0.15) 0%, transparent 70%)"
        pointerEvents="none"
      />

      <Container maxW="container.sm" py={20} position="relative">
        <VStack spacing={8} align="stretch">
          {/* Card principal */}
          <Box
            bg="#13142A"
            border="1px solid rgba(124,58,237,0.3)"
            borderRadius="2xl"
            p={10}
            boxShadow="0 0 40px rgba(124,58,237,0.1)"
          >
            <VStack spacing={6} align="center">
              {/* Título com gradiente */}
              <Text
                fontSize="6xl"
                fontWeight="black"
                bgGradient="linear(to-r, #7C3AED, #3B82F6)"
                bgClip="text"
                lineHeight={1.1}
              >
                BetTimes
              </Text>

              <Text
                fontSize="xl"
                color="whiteAlpha.800"
                fontWeight="semibold"
                textAlign="center"
              >
                Apostas on-chain em disputas de times
              </Text>

              <Text
                fontSize="md"
                color="whiteAlpha.600"
                textAlign="center"
                maxW="sm"
              >
                Conecte sua carteira MetaMask para participar das disputas e
                apostar com POL na blockchain.
              </Text>

              {/* Botão MetaMask */}
              <Button
                variant="brand"
                size="lg"
                width="full"
                height="14"
                fontSize="md"
                isLoading={isLoading}
                loadingText="Conectando..."
                onClick={btnLoginClick}
                leftIcon={
                  <Image src="/metamask.svg" boxSize="28px" alt="MetaMask" />
                }
              >
                Conectar com MetaMask
              </Button>

              {/* Mensagem de erro */}
              {message && (
                <Text color="red.400" fontSize="sm" textAlign="center">
                  {message}
                </Text>
              )}
            </VStack>
          </Box>

          {/* Badge "powered by blockchain" */}
          <Flex justify="center" align="center" gap={2}>
            <Box w={2} h={2} borderRadius="full" bg="#7C3AED" />
            <Text color="whiteAlpha.400" fontSize="xs" letterSpacing="widest">
              POWERED BY POLYGON BLOCKCHAIN
            </Text>
            <Box w={2} h={2} borderRadius="full" bg="#3B82F6" />
          </Flex>
        </VStack>
      </Container>

      {/* Footer */}
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        borderTop="1px solid rgba(124,58,237,0.15)"
        py={4}
        px={8}
      >
        <Flex justify="space-between" align="center">
          <Text color="whiteAlpha.400" fontSize="sm">
            © 2024 BetTimes
          </Text>
          <Flex gap={6}>
            <Link href="/" color="whiteAlpha.400" fontSize="sm" _hover={{ color: "white" }}>
              Home
            </Link>
            <Link href="/about" color="whiteAlpha.400" fontSize="sm" _hover={{ color: "white" }}>
              About
            </Link>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}
