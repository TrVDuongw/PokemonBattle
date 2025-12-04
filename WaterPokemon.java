public class WaterPokemon extends Pokemon {
    public WaterPokemon(String name, int hp, int attack) {
        super(name, "Water", hp, attack);
    }

    @Override
    public void attack(Pokemon target) {
        int dmg = attack + 8;
        System.out.println(name + " dùng Water Gun gây " + dmg + " sát thương!");
        target.takeDamage(dmg);
    }
}
