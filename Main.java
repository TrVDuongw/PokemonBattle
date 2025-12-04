import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        Pokemon[] pokemons = new Pokemon[] {
            new FirePokemon("Charmander", 100, 25),
            new WaterPokemon("Squirtle", 110, 20),
            new GrassPokemon("Bulbasaur", 105, 22)
        };

        System.out.println("Chọn Pokemon của bạn:");
        for (int i = 0; i < pokemons.length; i++) {
            System.out.printf("%d. ", i+1);
            pokemons[i].showInfo();
        }
        System.out.print("Nhập số (1-3): ");
        int choice = 1;
        try {
            choice = Integer.parseInt(sc.nextLine());
            if (choice < 1 || choice > pokemons.length) choice = 1;
        } catch (Exception e) {
            choice = 1;
        }

        Pokemon player = pokemons[choice-1];
        Pokemon enemy = pokemons[(choice) % pokemons.length]; // simple enemy

        System.out.println("\nBạn chọn: ");
        player.showInfo();
        System.out.println("Đối thủ: ");
        enemy.showInfo();
        System.out.println();

        Battle.fight(player, enemy);

        sc.close();
    }
}
