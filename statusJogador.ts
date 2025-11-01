class Jogador {
  private estado: string = "Offline";

  private transicoes: Record<string, string[]> = {
    "Offline": ["Online"],
    "Online": ["Em Jogo", "Offline"],
    "Em Jogo": ["Pausado", "Desconectado"],
    "Pausado": ["Em Jogo", "Desconectado"],
    "Desconectado": ["Offline"],
  };

  private mensagens: Record<string, string> = {
    "Offline->Online": "Jogador agora está online.",
    "Online->Em Jogo": "Jogador iniciou o jogo.",
    "Em Jogo->Pausado": "Jogo pausado.",
    "Pausado->Em Jogo": "Jogo retomado.",
    "Em Jogo->Desconectado": "Jogador desconectado durante o jogo.",
    "Pausado->Desconectado": "Jogador desconectado enquanto o jogo estava pausado.",
    "Desconectado->Offline": "Jogador voltou ao modo offline.",
  };

  private mudarEstado(novoEstado: string): void {
    const possiveis = this.transicoes[this.estado];
    if (possiveis && possiveis.includes(novoEstado)) {
      console.log(this.mensagens[`${this.estado}->${novoEstado}`] || `Mudou de ${this.estado} para ${novoEstado}`);
      this.estado = novoEstado;
    } else {
      console.log(`⚠️ Transição inválida: ${this.estado} → ${novoEstado}`);
    }
  }

  ficarOnline() { this.mudarEstado("Online"); }
  iniciarJogo() { this.mudarEstado("Em Jogo"); }
  pausar() { this.mudarEstado("Pausado"); }
  desconectar() { this.mudarEstado("Desconectado"); }
  voltarOffline() { this.mudarEstado("Offline"); }
  getEstado() { console.log(`Estado atual: ${this.estado}`); }
}

const jogador = new Jogador();
jogador.getEstado();
jogador.ficarOnline();
jogador.iniciarJogo();
jogador.pausar();
jogador.desconectar();
jogador.voltarOffline();