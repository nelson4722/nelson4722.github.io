import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const categorias = {
  consumible: ["empanada", "anticucho", "choripán", "tapadito", "brocheta"],
  bebestible: [
    "mote con huesillo",
    "piscola",
    "cerveza",
    "terremoto",
    "tropical gin",
    "ramazzotti",
  ],
  articulo: [
    "viagra",
    "paracetamol",
    "parche león",
    "propóleo",
    "pañuelos desechables",
    "parche curita",
  ],
};

export default function IndexScreen() {
  const [consumible, setConsumible] = useState<string>("");
  const [bebestible, setBebestible] = useState<string>("");
  const [articulo, setArticulo] = useState<string>("");

  const [nombre, setNombre] = useState<string>("");
  const [mostrarModal, setMostrarModal] = useState<boolean>(true);

  const [intentos, setIntentos] = useState<number>(0);
  const [confirmado, setConfirmado] = useState<boolean>(false);

  const getRandom = (arr: string[]) =>
    arr[Math.floor(Math.random() * arr.length)];

  const generarConEfecto = () => {
    let counter = 0;
    const interval = setInterval(() => {
      setConsumible(getRandom(categorias.consumible));
      setBebestible(getRandom(categorias.bebestible));
      setArticulo(getRandom(categorias.articulo));
      counter++;
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      setConsumible(getRandom(categorias.consumible));
      setBebestible(getRandom(categorias.bebestible));
      setArticulo(getRandom(categorias.articulo));
    }, 1500);
  };

  const guardarNombre = () => {
    if (nombre.trim() !== "") {
      setMostrarModal(false);
      setIntentos(1);
      generarConEfecto();
    }
  };

  const confirmarResultado = () => {
    setConfirmado(true);
  };

  const reintentar = () => {
    if (intentos < 2) {
      setIntentos(intentos + 1);
      generarConEfecto();
    }
  };

  const resetJuego = () => {
    setConsumible("");
    setBebestible("");
    setArticulo("");
    setNombre("");
    setIntentos(0);
    setConfirmado(false);
    setMostrarModal(true);
  };

  return (
    <View style={styles.container}>
      {/* Modal para pedir nombre */}
      <Modal visible={mostrarModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ingresa tu nombre</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: Nelson"
              value={nombre}
              onChangeText={setNombre}
            />
            <TouchableOpacity style={styles.modalButton} onPress={guardarNombre}>
              <Text style={styles.modalButtonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Text style={styles.title}>
        Hola “{nombre || "Invitado"}”, ganaste lo siguiente:
      </Text>

      <View style={styles.row}>
        <View style={styles.card}>
          <Text style={styles.emoji}>🥪</Text>
          <Text style={styles.label}>{consumible || "Consumible"}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.emoji}>🍹</Text>
          <Text style={styles.label}>{bebestible || "Bebestible"}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.emoji}>💊</Text>
          <Text style={styles.label}>{articulo || "Artículo"}</Text>
        </View>
      </View>

      {!confirmado && intentos > 0 && (
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#28a745" }]}
            onPress={confirmarResultado}
          >
            <Text style={styles.buttonText}>Confirmar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: intentos >= 2 ? "#ccc" : "#dc3545" },
            ]}
            onPress={reintentar}
            disabled={intentos >= 2}
          >
            <Text style={styles.buttonText}>
              {intentos >= 2 ? "Sin intentos" : "Reintentar"}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {confirmado && (
        <TouchableOpacity
          style={[styles.button, { marginTop: 20, backgroundColor: "#004b87" }]}
          onPress={resetJuego}
        >
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 30,
    fontWeight: "600",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
  },
  card: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    marginHorizontal: 5,
    paddingVertical: 30,
    backgroundColor: "#fff",
  },
  emoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  actions: {
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "space-between",
    width: "80%",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    width: "100%",
    padding: 10,
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: "#004b87",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 6,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
