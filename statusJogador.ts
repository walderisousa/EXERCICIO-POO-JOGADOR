interface Estado {
  ficarOnline(): void;
  iniciarJogo(): void;
  pausar(): void;
  desconectar(): void;
  voltarOffline(): void;
}

class Jogador {
  private estado: Estado;
  constructor() {
    this.estado = new Offline(this);
  }
  setEstado(estado: Estado) {
    this.estado = estado;
  }
  ficarOnline() { this.estado.ficarOnline(); }
  iniciarJogo() { this.estado.iniciarJogo(); }
  pausar() { this.estado.pausar(); }
  desconectar() { this.estado.desconectar(); }
  voltarOffline() { this.estado.voltarOffline(); }
}

class Offline implements Estado {
  constructor(private jogador: Jogador) {}
  ficarOnline() {
    console.log("Jogador agora está online.");
    this.jogador.setEstado(new Online(this.jogador));
  }
  iniciarJogo() { console.log("Não pode iniciar jogo estando offline."); }
  pausar() { console.log("Não pode pausar estando offline."); }
  desconectar() { console.log("Já está offline."); }
  voltarOffline() { console.log("Já está offline."); }
}

class Online implements Estado {
  constructor(private jogador: Jogador) {}
  ficarOnline() { console.log("Já está online."); }
  iniciarJogo() {
    console.log("Jogador iniciou o jogo.");
    this.jogador.setEstado(new EmJogo(this.jogador));
  }
  pausar() { console.log("Não pode pausar fora do jogo."); }
  desconectar() {
    console.log("Jogador desconectado.");
    this.jogador.setEstado(new Desconectado(this.jogador));
  }
  voltarOffline() {
    console.log("Jogador voltou ao modo offline.");
    this.jogador.setEstado(new Offline(this.jogador));
  }
}

class EmJogo implements Estado {
  constructor(private jogador: Jogador) {}
  ficarOnline() { console.log("Já está jogando."); }
  iniciarJogo() { console.log("Já está jogando."); }
  pausar() {
    console.log("Jogo pausado.");
    this.jogador.setEstado(new Pausado(this.jogador));
  }
  desconectar() {
    console.log("Jogador desconectado durante o jogo.");
    this.jogador.setEstado(new Desconectado(this.jogador));
  }
  voltarOffline() { console.log("Saia do jogo primeiro."); }
}

class Pausado implements Estado {
  constructor(private jogador: Jogador) {}
  ficarOnline() { console.log("Não pode ficar online enquanto o jogo está pausado."); }
  iniciarJogo() {
    console.log("Jogo retomado.");
    this.jogador.setEstado(new EmJogo(this.jogador));
  }
  pausar() { console.log("Já está pausado."); }
  desconectar() {
    console.log("Jogador desconectado enquanto o jogo estava pausado.");
    this.jogador.setEstado(new Desconectado(this.jogador));
  }
  voltarOffline() { console.log("Saia do jogo primeiro."); }
}

class Desconectado implements Estado {
  constructor(private jogador: Jogador) {}
  ficarOnline() { console.log("Não pode ficar online, reconecte primeiro."); }
  iniciarJogo() { console.log("Não pode iniciar jogo desconectado."); }
  pausar() { console.log("Não pode pausar estando desconectado."); }
  desconectar() { console.log("Já está desconectado."); }
  voltarOffline() {
    console.log("Jogador voltou ao modo offline.");
    this.jogador.setEstado(new Offline(this.jogador));
  }
}

const jogador = new Jogador();
jogador.ficarOnline();
jogador.iniciarJogo();
jogador.pausar();
jogador.desconectar();
jogador.voltarOffline();