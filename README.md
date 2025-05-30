# Calculadora de Queda Livre em Java

![Java](https://img.shields.io/badge/Java-17%2B-blue)

Um programa simples que calcula os parâmetros de um objeto em queda livre com base na altura inicial e tempo de queda.

## Funcionalidades

- Calcula a velocidade final do objeto
- Determina a altura final após o tempo de queda especificado
- Calcula o deslocamento vertical durante a queda
- Exibe resultados formatados com cores no terminal

## Como Usar

1. Certifique-se de ter o Java JDK instalado (versão 17 ou superior recomendada)
2. Compile o programa: `javac Trabalho.java`
3. Execute o programa: `java Trabalho`
4. Siga as instruções no terminal:
   - Digite a altura inicial em metros
   - Digite o tempo de queda em segundos
5. Veja os resultados calculados

## Fórmulas Utilizadas

- Altura final: `h = h₀ - 0.5 * g * t²`
- Velocidade final: `v = g * t`
- Deslocamento vertical: `Δh = h₀ - h`

Onde:
- `h₀` = altura inicial
- `g` = aceleração gravitacional (9.80665 m/s²)
- `t` = tempo de queda

## Personalização

Você pode modificar as cores da saída alterando as constantes:
- `AZUL` para resultados
- `VERMELHO` para títulos
- `RESET` para voltar à cor padrão

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.
