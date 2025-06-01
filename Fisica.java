import java.util.InputMismatchException;
import java.util.Scanner;

public class Fisica{
    public static void main(String[] args) { // iniciando main
        Scanner input = new Scanner(System.in);

        // variáveis
        double segundos, alturaInicial; // variáveis de input
        double alturaFinal, velocidadeFinal, deslocamentoVertical; // variáveis de cálculo
        double aceleracao = 0;

        boolean certo = false;
        
        // cores
        String AZUL = "\u001B[34m";
        String RESET = "\u001B[0m";
        String VERMELHO = "\u001B[31m";
        String AMARELO = "\u001B[33m";
        String PRETO = "\u001B[30m";

        // backgrounds
        String BRANCO_BACKGROUND = "\u001B[47m";

        // iniciando loop
        do{
            // try-catch
            try {

                // entrada de dados
                System.out.print(AMARELO + "Digite a altura inicial (m): " + RESET);
                alturaInicial = input.nextDouble();

                System.out.print(AMARELO + "Digite o tempo da queda (s): " + RESET);
                segundos = input.nextDouble();

                // do-while
                do{
                    System.out.println(AMARELO + "Escolha o valor da aceleração: " + RESET);
                    System.out.println("""
                        [1] 9,80665 m/s²
                        [2] 9,8 m/s²
                        [3] 9,81 m/s²
                        [4] 10 m/s²
                        """);
                        
                        aceleracao = input.nextDouble();

                        if (aceleracao == 1){
                            aceleracao = 9.80665;
                        } else if (aceleracao == 2){
                            aceleracao = 9.8;
                        } else if (aceleracao == 3){
                            aceleracao = 9.81;
                        } else if (aceleracao == 4){
                            aceleracao = 10;
                        } else{aceleracao = 0;
                            System.out.println(VERMELHO + "Opção inválida.\n" + RESET);
                        }
                } while (aceleracao == 0);

                    // cálculos
                    alturaFinal = calcularAltura(alturaInicial, segundos, aceleracao);
                    velocidadeFinal = calcularVelocidade(segundos, aceleracao);
                    deslocamentoVertical = alturaInicial - alturaFinal;

                    // Resultados
                    System.out.println(PRETO + BRANCO_BACKGROUND + "\n=== RESULTADOS ===" + RESET);
                    System.out.printf("\nVelocidade final: " + AZUL + "%.2f m/s" + RESET, velocidadeFinal);
                    System.out.printf("\nAltura final: " + AZUL + "%.2f m" + RESET, alturaFinal);
                    System.out.printf("\nDeslocamento vertical: " + AZUL + "%.2f m\n" + RESET, deslocamentoVertical);

                    certo = true; // encerra o loop

            } catch (InputMismatchException ime) {
                System.out.println(VERMELHO + "\nDigite apenas números.\n" + RESET);
                input.nextLine(); // limpa o buffer
            }

        } while (! certo);
    }   // fechando main 
    
    public static double calcularAltura(double alturaInicial, double tempo, double aceleracao) { // iniciando calcularAltura
        return alturaInicial - 0.5 * aceleracao * Math.pow(tempo, 2);
    } // fechando calcularAltura

    public static double calcularVelocidade(double tempo, double aceleracao) { // iniciando calcularVelocidade
        return aceleracao * tempo;
    } // fechando calcularVelocidade
}
