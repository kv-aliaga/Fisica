import java.util.Scanner;

public class Fisica{
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        // variáveis
        double segundos, alturaInicial; // variáveis de input
        double alturaFinal, velocidadeFinal, deslocamentoVertical; // variáveis de cálculo
        double aceleracao = 9.80665;
        
        // cores
        String AZUL = "\u001B[34m";
        String RESET = "\u001B[0m";
        String VERMELHO = "\u001B[31m";

        // entrada de dados
        System.out.print("Digite a altura inicial (m): ");
        alturaInicial = input.nextDouble();

        System.out.print("Digite o tempo da queda (s): ");
        segundos = input.nextDouble();

        // cálculos
        alturaFinal = calcularAltura(alturaInicial, segundos, aceleracao);
        velocidadeFinal = calcularVelocidade(segundos, aceleracao);
        deslocamentoVertical = alturaInicial - alturaFinal;

        // Resultados
        System.out.println(VERMELHO + "\n=== RESULTADOS ===" + RESET);
        System.out.printf("\nVelocidade final: " + AZUL + "%.2f m/s" + RESET, velocidadeFinal);
        System.out.printf("\nAltura final: " + AZUL + "%.2f m" + RESET, alturaFinal);
        System.out.printf("\nDeslocamento vertical: " + AZUL + "%.2f m\n" + RESET, deslocamentoVertical);
    }

    public static double calcularAltura(double alturaInicial, double tempo, double aceleracao) {
        return alturaInicial - 0.5 * aceleracao * Math.pow(tempo, 2);
    }

    public static double calcularVelocidade(double tempo, double aceleracao) {
        return aceleracao * tempo;
    }
}
