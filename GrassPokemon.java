public class GrassPokemon extends Pokemon {
    public GrassPokemon(String name, int hp, int attack) {
        super(name, "Grass", hp, attack);
    }

    @Override
    public void attack(Pokemon target) {
        int dmg = attack + 6;
        System.out.println(name + " dùng Leaf Blade gây " + dmg + " sát thương!");
        target.takeDamage(dmg);
    }
}
