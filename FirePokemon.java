public class FirePokemon extends Pokemon {
    public FirePokemon(String name, int hp, int attack) {
        super(name, "Fire", hp, attack);
    }

    @Override
    public void attack(Pokemon target) {
        int dmg = attack + 10;
        System.out.println(name + " dùng Ember gây " + dmg + " sát thương!");
        target.takeDamage(dmg);
    }
}
