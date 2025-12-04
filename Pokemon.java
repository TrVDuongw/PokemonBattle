public abstract class Pokemon {
    protected String name;
    protected String type;
    protected int hp;
    protected int attack;

    public Pokemon(String name, String type, int hp, int attack) {
        this.name = name;
        this.type = type;
        this.hp = hp;
        this.attack = attack;
    }

    public abstract void attack(Pokemon target);

    public void takeDamage(int dmg) {
        hp -= dmg;
        if (hp < 0) hp = 0;
    }

    public boolean isFainted() {
        return hp <= 0;
    }

    public void showInfo() {
        System.out.printf("%s (%s) - HP: %d, ATK: %d\n", name, type, hp, attack);
    }
}
