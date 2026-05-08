"use client";

import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Image,
  Link,
  SimpleGrid,
  Spinner,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { claimPrize, getDispute, placeBet } from "@/services/Web3Services";
import Web3 from "web3";

function truncateAddress(addr) {
  if (!addr) return "";
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export default function Bet() {
  const { push } = useRouter();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [wallet, setWallet] = useState("");
  const [dispute, setDispute] = useState({
    team1: "Carregando...",
    team2: "Carregando...",
    img1: "",
    img2: "",
    total1: 0,
    total2: 0,
    winner: 0,
  });

  useEffect(() => {
    const savedWallet = localStorage.getItem("wallet");
    if (!savedWallet) return push("/");
    setWallet(savedWallet);
    setMessage("Obtendo dados da disputa...");
    getDispute()
      .then((data) => {
        setDispute(data);
        setMessage("");
      })
      .catch((err) => {
        console.error(err);
        setMessage(err.message);
      });
  }, []);

  function processBet(team) {
    const amount = prompt("Quantia em POL para apostar:", "1");
    if (!amount) return;
    setMessage("Aguardando confirmação na carteira...");
    setIsLoading(true);
    placeBet(team, amount)
      .then(() => {
        alert("Aposta recebida! Pode demorar 1 minuto para aparecer no sistema.");
        setMessage("");
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err.data ? err.data : err);
        setMessage(err.data ? err.data.message : err.message);
        setIsLoading(false);
      });
  }

  function doLogout() {
    localStorage.removeItem("wallet");
    push("/");
  }

  function btnClaimClick() {
    setMessage("Aguardando confirmação na carteira...");
    setIsLoading(true);
    claimPrize()
      .then(() => {
        alert("Prêmio coletado! Pode demorar 1 minuto para aparecer na sua carteira.");
        setMessage("");
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err.data ? err.data : err);
        setMessage(err.data ? err.data.message : err.message);
        setIsLoading(false);
      });
  }

  const cardStyle = {
    bg: "#13142A",
    border: "1px solid rgba(124,58,237,0.3)",
    borderRadius: "2xl",
    p: 6,
    transition: "all 0.2s",
    _hover: {
      boxShadow: "0 0 30px rgba(124,58,237,0.35)",
      borderColor: "rgba(124,58,237,0.6)",
      transform: "translateY(-2px)",
    },
  };

  return (
    <Box minH="100vh" bg="#0D0E1A">
      {/* Header */}
      <Box
        borderBottom="1px solid rgba(124,58,237,0.2)"
        px={8}
        py={4}
        bg="rgba(19,20,42,0.8)"
        backdropFilter="blur(10px)"
        position="sticky"
        top={0}
        zIndex={10}
      >
        <Flex justify="space-between" align="center">
          <HStack spacing={3}>
            <Text
              fontSize="2xl"
              fontWeight="black"
              bgGradient="linear(to-r, #7C3AED, #3B82F6)"
              bgClip="text"
            >
              BetTimes
            </Text>
            <Badge
              bg="rgba(124,58,237,0.2)"
              color="#A78BFA"
              border="1px solid rgba(124,58,237,0.4)"
              borderRadius="full"
              px={3}
              py={1}
              fontSize="xs"
              letterSpacing="wider"
            >
              ON-CHAIN
            </Badge>
          </HStack>

          {wallet && (
            <Tooltip label="Clique para desconectar" placement="bottom">
              <Button
                variant="unstyled"
                bg="rgba(124,58,237,0.15)"
                border="1px solid rgba(124,58,237,0.3)"
                borderRadius="full"
                px={4}
                py={2}
                h="auto"
                onClick={doLogout}
                _hover={{
                  bg: "rgba(239,68,68,0.15)",
                  borderColor: "rgba(239,68,68,0.4)",
                }}
              >
                <Text color="#A78BFA" fontSize="sm" fontFamily="mono">
                  {truncateAddress(wallet)}
                </Text>
              </Button>
            </Tooltip>
          )}
        </Flex>
      </Box>

      <Container maxW="container.lg" py={10}>
        <VStack spacing={8} align="stretch">
          {/* Título da seção */}
          <VStack align="start" spacing={1}>
            <Text fontSize="3xl" fontWeight="bold" color="white">
              Disputa Atual
            </Text>
            <Text color="whiteAlpha.600">
              {dispute.winner == 0
                ? "Escolha um time e faça sua aposta em POL"
                : "Disputa encerrada — veja o vencedor e solicite seu prêmio"}
            </Text>
          </VStack>

          {/* Cards dos times */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {(dispute.winner == 0 || dispute.winner == 1) && (
              <Box {...cardStyle}>
                <VStack spacing={4}>
                  <Image
                    src={dispute.img1 || "/team-placeholder.svg"}
                    alt={dispute.team1}
                    borderRadius="xl"
                    maxH="200px"
                    objectFit="cover"
                    w="full"
                  />
                  <Text fontSize="xl" fontWeight="bold" color="white">
                    {dispute.team1}
                  </Text>
                  <Badge
                    bgGradient="linear(to-r, rgba(124,58,237,0.3), rgba(59,130,246,0.3))"
                    border="1px solid rgba(124,58,237,0.4)"
                    color="whiteAlpha.900"
                    borderRadius="full"
                    px={4}
                    py={2}
                    fontSize="sm"
                  >
                    {Web3.utils.fromWei(dispute.total1.toString(), "ether")} POL apostados
                  </Badge>
                  {dispute.winner == 1 ? (
                    <Button
                      width="full"
                      colorScheme="green"
                      size="lg"
                      onClick={btnClaimClick}
                      isLoading={isLoading}
                      loadingText="Processando..."
                    >
                      Pegar meu prêmio 🏆
                    </Button>
                  ) : (
                    <Button
                      variant="brand"
                      width="full"
                      size="lg"
                      onClick={() => processBet(1)}
                      isLoading={isLoading}
                      loadingText="Processando..."
                    >
                      Apostar nesse time
                    </Button>
                  )}
                </VStack>
              </Box>
            )}

            {(dispute.winner == 0 || dispute.winner == 2) && (
              <Box {...cardStyle}>
                <VStack spacing={4}>
                  <Image
                    src={dispute.img2 || "/team-placeholder.svg"}
                    alt={dispute.team2}
                    borderRadius="xl"
                    maxH="200px"
                    objectFit="cover"
                    w="full"
                  />
                  <Text fontSize="xl" fontWeight="bold" color="white">
                    {dispute.team2}
                  </Text>
                  <Badge
                    bgGradient="linear(to-r, rgba(124,58,237,0.3), rgba(59,130,246,0.3))"
                    border="1px solid rgba(124,58,237,0.4)"
                    color="whiteAlpha.900"
                    borderRadius="full"
                    px={4}
                    py={2}
                    fontSize="sm"
                  >
                    {Web3.utils.fromWei(dispute.total2.toString(), "ether")} POL apostados
                  </Badge>
                  {dispute.winner == 2 ? (
                    <Button
                      width="full"
                      colorScheme="green"
                      size="lg"
                      onClick={btnClaimClick}
                      isLoading={isLoading}
                      loadingText="Processando..."
                    >
                      Pegar meu prêmio 🏆
                    </Button>
                  ) : (
                    <Button
                      variant="brand"
                      width="full"
                      size="lg"
                      onClick={() => processBet(2)}
                      isLoading={isLoading}
                      loadingText="Processando..."
                    >
                      Apostar nesse time
                    </Button>
                  )}
                </VStack>
              </Box>
            )}
          </SimpleGrid>

          {/* Mensagem de status */}
          {message && (
            <Flex justify="center" align="center" gap={3}>
              {isLoading && <Spinner size="sm" color="#7C3AED" />}
              <Text color="whiteAlpha.700" fontSize="sm">
                {message}
              </Text>
            </Flex>
          )}
        </VStack>
      </Container>

      {/* Footer */}
      <Box
        borderTop="1px solid rgba(124,58,237,0.15)"
        py={4}
        px={8}
        mt={10}
      >
        <Flex justify="space-between" align="center">
          <Text color="whiteAlpha.400" fontSize="sm">
            © 2024 BetTimes, Inc
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
